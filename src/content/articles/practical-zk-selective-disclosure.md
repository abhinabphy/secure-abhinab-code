---
title: Practical zk Circuits for Selective Disclosure
date: "2024-08-09"
tags:
  - zk
  - move
excerpt: Designing Circom circuits that prove a health metric threshold without revealing the metric, and the on-chain commitment scheme behind it.
---

Selective disclosure is the smallest useful zk application: prove a value sits above a
threshold without revealing the value. The circuit itself is a comparator plus a
commitment check; the engineering is in everything around it.

On-chain, the commitment must be bound to an identity and to a time window, or a proof
can be replayed by anyone who observes it. Off-chain, the raw metric never leaves the
device, which means the proving key and witness generation have to run in a browser
budget.

Circom keeps the constraint count small enough that this is practical today.
