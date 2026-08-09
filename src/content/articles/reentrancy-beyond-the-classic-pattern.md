---
title: Reentrancy Beyond the Classic Pattern
date: "2025-06-18"
tags:
  - security
  - solidity
excerpt: Cross-function and cross-contract reentrancy paths that checks-effects-interactions alone does not close, with a Foundry test harness to catch them.
---

The classic reentrancy story ends at checks-effects-interactions. In practice, most
of the reentrancy findings worth reporting live outside that pattern: shared state
touched by two different functions, or a callback that re-enters a sibling contract
rather than the one that made the external call.

Cross-function reentrancy shows up whenever two entry points read and write the same
accounting variable but only one of them is guarded. Cross-contract reentrancy shows
up whenever a protocol splits state across modules and only guards the module holding
the transfer.

A useful harness inverts the usual test: instead of asserting a happy-path balance,
deploy an attacker contract whose fallback re-enters every public function in turn and
assert that every invariant still holds after the transaction settles.
