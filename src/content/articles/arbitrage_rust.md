---
title: Detecting Arbitrage Opportunities
date: "2025-02-11"
tags: [security, solidity]
excerpt: Detecting DeFi arbitrage as negative cycles in a log-weighted AMM graph using Bellman-Ford Negative Cycle search method.
---



The core idea behind arbitrage detection in AMM-based DeFi markets is to represent swap routes as edges in a directed graph and then search for **negative cost cycles**. A negative cycle here corresponds to an arbitrage loop—starting with one token and returning to it with more value than we started.



![Architecture](/images/Architecture.jpeg)


The **unique improvement** adopted here, based on the research in the BTP project, is to convert token swap prices into *log-space*, allowing multiplicative price paths to be treated additively. This makes detecting arbitrage equivalent to finding cycles whose total log-weight is **< 0**.

Instead of manually comparing pool prices, we let the graph tell us when a profitable loop exists.

The conversion is straightforward:

```
weight(u → v) = -ln( (1 - fee) * price(u→v) )
```

If a cycle’s total weight is negative, then:

```
exp(-sum(weights)) > 1   → profitable arbitrage exists
```

This is the key insight used throughout the bot’s arbitrage detection stage.

---


### Bellman–Ford Negative Cycle Search

We relax edges `V - 1` times, then check a final time:
if anything still improves, a **negative cycle** exists.

```rust
pub fn find_arbitrage(network: &Network, min_profit: f64) -> Vec<ArbitrageCycle> {
    let mut results = Vec::new();

    // Build adjacency list
    let mut adj: HashMap<String, Vec<&DirEdge>> = HashMap::new();
    for e in &network.edges {
        adj.entry(e.from.clone()).or_default().push(e);
    }

    // For each token as source, run Bellman-Ford in log-space
    for source in &network.tokens {
        let mut dist: HashMap<String, f64> = HashMap::new();
        let mut pred: HashMap<String, Option<String>> = HashMap::new();

        for t in &network.tokens {
            dist.insert(t.clone(), f64::INFINITY);
            pred.insert(t.clone(), None);
        }
        dist.insert(source.clone(), 0.0);

        let n = network.tokens.len();
        for _ in 0..n - 1 {
            let mut updated = false;
            for e in &network.edges {
                if let Some(&du) = dist.get(&e.from) {
                    if let Some(dv) = dist.get_mut(&e.to) {
                        if du + e.weight < *dv {
                            *dv = du + e.weight;
                            pred.insert(e.to.clone(), Some(e.from.clone()));
                            updated = true;
                        }
                    }
                }
            }
            if !updated {
                break;
            }
        }

        // detect negative cycle: product of rates > 1
        for e in &network.edges {
            if let (Some(&du), Some(&dv)) = (dist.get(&e.from), dist.get(&e.to)) {
                if du + e.weight < dv {
                    // reconstruct loop
                    let mut cycle_tokens = vec![e.to.clone()];
                    let mut cur = e.from.clone();
                    let mut visited = HashSet::new();
                    while !visited.contains(&cur) && cycle_tokens.len() < n {
                        visited.insert(cur.clone());
                        cycle_tokens.push(cur.clone());
                        if let Some(Some(prev)) = pred.get(&cur).map(|x| x.clone()) {
                            cur = prev;
                        } else {
                            break;
                        }
                    }
                    cycle_tokens.reverse();

                    // compute product (multiplier)
                    let mut product = 1.0;
                    for w in cycle_tokens.windows(2) {
                        if let Some(edges) = adj.get(&w[0]) {
                            if let Some(e) = edges.iter().find(|edge| edge.to == w[1]) {
                                product *= e.rate;
                            }
                        }
                    }
                    let profit_pct = (product - 1.0) * 100.0;
                    if profit_pct > min_profit * 100.0 {
                        results.push(ArbitrageCycle {
                            start_token: source.clone(),
                            path: cycle_tokens.clone(),
                            product,
                            profit_pct,
                        });
                    }
                }
            }
        }
    }

    results
}
```

This detects **profitable multi-hop AMM arbitrage loops** automatically—no need to enumerate trading paths manually.

---

### Essential Insights (Condensed from the BTP Report)

* AMM prices can be treated mathematically as **weighted edges**.
* Taking `-ln()` converts multiplicative price paths into **additive sums**, enabling graph-based reasoning.
* Arbitrage → **Negative cycle detection**.
* Bellman–Ford is optimal because:

  * It does **not** require non-negative weights.
  * It explicitly highlights cycles rather than shortest end-points.
* Once a cycle is found:

  * Re-simulate swaps along that loop.
  * Compute **optimal trade size** considering slippage.
  * Only execute if **net profit > gas**.

The project does not “guess” arbitrage—it derives it directly from mathematical structure.


