---
layout: post
title:  "Consensus Manager"
date:   2014-02-01 13:04:14 +0100
categories: consensus
---

In one of my side-project - which uses socket.io - I need to reach a consensus amongst users in the same room. Initial requirements:

- The definition of ‘consensus’ should be flexible and interchangeable in run-time;
- The time to reach the consensus should be tracked;
- The final consensus amongst the clients could possibly output some data that the server may need to use further on;

My solution consists of a modular [`consensus-manager`](https://github.com/gpestana/consensus-manager) in JS. It is responsible for starting the consensus process and receiving and processing the responses from the clients. 
Finally, according to a pre-defined strategy, it puts an end to the protocol when the consensus has been reached. In addition, the consensus manager keeps track of the time taken for the whole 
process to be concluded, as well as stores the data coming from the clients.

The module is available on npm:

```
npm install consensus-manager
```

As an example, let’s consider a simple case: In a chat system, there are `X` peers connected to a server at a given time. The server should fire an event when half of the peers had communicated how many
lines of chat each of them wrote, which is stored locally. Let’s also consider that the connection is maintained with socket.io.

First, we must implement the consensus strategy, or the logic that defines what a consensus is:

```js

module.exports = strategy_half

function strategy_half(min_res) {
  this.min_res    = min_res //where min_res is half of the X room users
}

strategy_half.prototype.isReady = function(results, time_diff, cb) {
  if(results.length == this.min_res) {
    cb(true, results, time_diff)
  }
  else cb(false)
}
The strategy is then passed in the consensus manager constructor:

var ConsensusManager = require('consensus-manager'),
Strategy             = require('... strategy_half.js')

var strategy = new Strategy(min_res)
var consensus = new ConsensusManager(strategy)
The underlying layers should take care of the communication between server and peers. Considering a socket.io communication layer, it would be something like this:

socket.in(roomID).emit('askNumberLines')


socket.on('numberLinesResponse', function(nr_lines) {
  consensus.process(nr_lines)
})
Finally, when the requirements implemented by the strategy are met, a consensus event is triggered:

consensus.on('consensus', function(output, time_diff) {
 //half of the peers answered and: 
 //i) ouput contains their responses, 
 //ii) time_diff says how much time did the process take.
})
```

If the responses keep coming from peers after the protocol is over, the manager will trigger a `notListening` event.

This solution is modular and extensible enough to structure and abstract simple scenarios of consensus and synchronization between peers, both in remote and local domains.
The decoupling between the consensus manager and the definition of consensus itself is what does the magic here.
