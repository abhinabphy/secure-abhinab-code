---
title: Move's Resource Model, From a Solidity Brain
date: "2024-11-21"
tags:
  - move
  - solidity
excerpt: Linear types remove entire vulnerability classes — and introduce new ones. A migration guide for auditors coming from EVM.
---

Move's linear resources make double-spends and accidental value destruction type errors
rather than runtime bugs. For an auditor arriving from Solidity, that removes a large
part of the usual checklist.

What replaces it is a new class of issues around capability handling: who holds the
signer, which module can publish a resource under which address, and whether an admin
capability is stored somewhere it can be borrowed from.

The mental shift is from "who can call this function" to "who holds this value".
