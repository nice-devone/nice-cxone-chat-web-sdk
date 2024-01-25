## CaseInboxAssigneeChanged

```js
{  
  "type": "CaseInboxAssigneeChanged",
  "data": {
    "brand": {Brand},
    "channel": {Channel},
    "case": {Contact},
    "preferredUserForNextAssign": {User}, // nullable
    "inboxAssignee": {User}, // nullable
    "previousInboxAssignee": {User}, // nullable
    "routingQueue": {RoutingQueue},
    "routingMode": "findmatch", // findmatch | resolver | legacy 
    "acceptRejectFlow": {
      "isEnabled": true,
      "refusalTimeoutSeconds": 100, // nullable
      "isTransfer": true 
    }
  }
}
```
