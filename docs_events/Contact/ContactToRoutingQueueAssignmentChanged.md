## ContactToRoutingQueueAssignmentChanged

```js
{  
  "type": "ContactToRoutingQueueAssignmentChanged",
  "data": {
    "brand": {Brand},
    "channel": {Channel},
    "case": {Contact},
    "preferredUserForNextAssign": {User},
    "routingQueue": {RoutingQueue} // nullable
    "routingMode": "findmatch", // findmatch | resolver | legacy 
    "previousRoutingQueue": {RoutingQueue} // nullable
  },
  "context": {
    "initiator": {
      "type": "system",
      "id": "abcd"
    }
  }
}
```
