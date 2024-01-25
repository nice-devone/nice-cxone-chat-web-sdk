## ContactStatusChanged

```js
{  
  "type": "ContactStatusChanged",
  "data": {
    "brand": {Brand},
    "channel": {Channel},
    "case": {Contact},
    "routingQueue": {RoutingQueue}, // nullable
    "routingMode": "findmatch", // findmatch | resolver | legacy 
    "preferredUserForNextAssign": {User}
  }
}
```
