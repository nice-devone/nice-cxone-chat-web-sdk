## FireProactiveAction

```js
{  
  "type": "FireProactiveAction",
  "data": {
    "destination": { // only in some actions
        "id": "a-b-c-d"
    },
    "proactiveAction": {
        "action": {ActionDetails},
        "conditions": [
            {ConditionDetails},
            {ConditionDetails}
        ]
    }
  }
}
```
