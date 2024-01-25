## MessageSent

```js
{
    "eventId": "713af94a-be01-4a79-bff4-f8c06dc06be9",
    "eventObject": "Message",
    "type": "MessageSent",
    "createdAt": "2019-03-18T14:42:26+00:00",
    "createdAtWithMilliseconds": "2019-03-18T14:42:26.421+00:00",
    "data": {
        "brand": {Brand},
        "channel": {
            "id": "chat_d6c1c24c-9d6f-4ec1-8252-f188fa1ee0dd"
        },
        "thread": {
            "idOnExternalPlatform": "364b2a21-f684-4e3c-8e93-cf4d09b60527"
        },
        "message": {
            "idOnExternalPlatform": "2fc774f7-3fc0-4619-b097-8df52e7d8295",
            "threadIdOnExternalPlatform": "7195d2d8-141c-4d28-ac51-4a0d7ca5d38b",
            "createdAt": "2023-06-15T03:24:21-07:00"
            "createdAtWithMilliseconds": "2023-06-15T03:24:21.072-07:00",
            "messageContent": {
                "type": "TEXT",
                "payload": {
                    "text": "Did that help you?"
                },
                "fallbackText": "Unsupported message content"
            },
            "direction": "outbound",
            "attachments": [],
            "recipients": [
                {
                    "idOnExternalPlatform": "df0d4efb-b239-4e33-b0c5-a0c8ba47a1c9",
                    "name": "Michal",
                    "isPrimary": true,
                    "isPrivate": false
                }
            ],
            "title": "",
            "authorUser": {User} // nullable          
        }
    }
}
```
