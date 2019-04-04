---
title: "Onion routing and mixing on P2P overlay networks"
date: '2019-02-18'
tags:
  - p2p
  - dht
  - privacy-preserving-networks
slug: decentralized-onion-routing
draft: false
---

*This post has been cross-posted at [hashmatter medium blog](https://medium.com/hashmatter)*

Traffic analysis in P2P networks should be a concern of network and protocol designers. P2P networks are susceptible to traffic analysis as a by product of its biggest merits: peer collaboration instead of centralized knowledge and partial-view instead of global view. By definition peers need to collaborate with each other for achieving whatever goal the network aims at solving. That same collaboration often leaks information about what are the goals of individual peers in the network. 

As practical example, consider [distributed hash tables](https://en.wikipedia.org/wiki/Distributed_hash_table) (DHT) where peers collaborate with each other on routing and looking up for content stored across the network. Peers do not keep and maintain a directory locally with pointers to where the data is stored in the DHT - that would be infeasible for large enough networks and networks under heavy churn. Each peer keep a local and partial view of the network and "ask" other peers to complete their view of the network when needed. The collaborative nature of P2P networks works as an ingenious counter measure against a central point of knowledge (and failure), where all the information needed to use the service is centralized and controlled by one or few entities. 

Why considering onion routing and mixing on P2P overlay networks
What is onion routing and mixing
Goals: completely decentralized (no authorities or centralized directories)
Presenting four main open challenges
Comparing with Tor

4 main problems: 

- randomly selecting relay nodes with partial view of the network

- circuit maintenance when relays churn

- overhead

- incentives for relayers

- (bonus) metrics and (again, Tor has this centralized)

Go (Goncalo Pestana)