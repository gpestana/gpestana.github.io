---
layout: post
title:  "In Pursuit of Private DHTs"
date:   2018-01-01 13:04:14 +0100
categories: security privacy dht
---

Services based on P2P and decentralized networks are reaching mass adoption (e.g. Bitcoin, Ethereum, IPFS, Dat). People are calling this new wave of distributed and decentralized systems the Web 3.0. Many of these services and networks rely heavily on Distributed Hash Tables (DHTs) - e.g. IPFS, bittorrent - or use it as an important building block (e.g. Ethereum). It is expected that DHTs will be an important building block for many networks and services for the Web 3.0.

Distributed hash tables are powerful protocols that enable content discovering and routing in P2P networks. In “vanilla” DHT implementations (e.g. Kademlia, Chord), peer interactions leak a lot of information about who is in the network, who stores what files and who are the producers and consumers of content. This gives potential attackers a good picture of the network with fewer resources and hinders anonymous and private interactions over P2P DHT overlay networks.

Some of the desirable properties of a private and metadata resistant DHT are:

- Anonymity for producers of content: tracking down who was the originator of content stored in the DHT should not be possible.
- Anonymity for consumers of content: nodes that request content from the DHT should not be linked to the requested content by external actors.
- Plausible deniability of the files hosted in the network nodes: when peers query for content in the DHT, they should not be able to identify which peers are storing the content.

The information leaked by DHTs can be used to target and censor individuals, communities and services. Private, anonymous and metadata resistant systems are important for ensuring that our privacy is protected against attackers. Thus, given the importance DHTs will have in future services and networks, it is important to research and develop protocols and primitives that keep DHT users anonymous.

[Research on metadata resistant DHT (Github)](https://github.com/gpestana/notes/issues/8)


