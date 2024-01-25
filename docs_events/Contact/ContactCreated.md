## ContactCreated

```js
{  
  "type": "ContactCreated",
  "data": {
    "brand": {Brand},
    "channel": {Channel},
    "case": {Contact},
    "routingQueue": {RoutingQueue}, // nullable
    "routingMode": "findmatch", // findmatch | resolver | legacy 
    "preferredUserForNextAssign": {User} // nullable
  }
}
```
