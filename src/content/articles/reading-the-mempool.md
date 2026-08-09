---
title: Reading the Mempool for Front-Running Signals
date: "2025-03-02"
tags:
  - security
  - mev
excerpt: How we score pending transactions in real time, and which heuristics survive contact with production traffic on EVM chains.
---

Mempool monitoring is mostly an exercise in throwing away data. The raw pending set is
noisy, duplicated across peers, and full of transactions that will never land.

The heuristics that survive production are the boring ones: calldata selector matching
against known router entry points, gas-price percentile relative to the current block,
and address reputation built from prior inclusion behaviour. Anything more clever tends
to overfit to a single week of traffic.

Scoring runs as a streaming pipeline so a signal is only useful if it can be computed
before the next block lands.
