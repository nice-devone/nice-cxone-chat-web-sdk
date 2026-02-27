# NICE CXone Chat Web SDK

- [Official SDK Documentation](https://help.nice-incontact.com/content/acd/digital/chatsdk/chatwebsdk.htm)
- [NPM package](https://www.npmjs.com/package/@nice-devone/nice-cxone-chat-web-sdk)
- [Sample Web App](https://github.com/nice-devone/nice-cxone-chat-web-sample)

## Requirements

- TypeScript **4.9**
- Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, `crypto`, etc.)
- Custom application bundler (webpack, create-react-app, etc.)

## Quickstart

1. Import the SDK into your project
  ```bash
  npm install @nice-devone/nice-cxone-chat-web-sdk
  ```
2. Login to your Brand and create a [Chat Channel](https://help.nice-incontact.com/content/acd/digital/chat/chatchannels.htm?tocpath=Digital%20First%20Omnichannel%7CDigital%20First%20Omnichannel%7CDigital%20Channels%7CChat%20Channels%7C_____0), setup their respective IDs in the SDK init (`brandId`, `channelId`)
3. Connect your project to the CXone environment (`environment`)
4. Fork [the code sandbox](https://codesandbox.io/s/nicecxone-chat-web-sdk-connection-test-ldmp53-ldmp53) and test your configuration
5. Implement your own UI layer, take inspiration from the [**Sample Web App**](https://github.com/nice-devone/nice-cxone-chat-web-sample)...


## SDK Usage examples

### Import the SDK

```ts
import ChatSdk, { EnvironmentName, ChatEvent, ChatEventData } from '@nice-devone/nice-cxone-chat-web-sdk';
```

### Init

```ts
// Initialize Chat SDK with required options
const sdk = new ChatSdk({
  brandId: 123,
  channelId: 'my-channel-id',
  customerId: 'customer-id',
  environment: EnvironmentName.EU1
});
```

### Authorization

```ts
await sdk.authorize()
```

### Channel Info
It will return information about the initialized channel, including feature toggle status, translations, file upload restrictions, theme color settings, and more.
```ts
await sdk.getChannelInfo()
```

### Channel Availability Info
It will return the online/offline status information for the current channel.
```ts
await sdk.getChannelAvailability()
```


### Thread

Get or create a Thread instance:

```ts
const thread = await sdk.getThread('thread-id');
// Optionally recover a thread state (messages) from the server
const threadRecoveredData = await thread.recover();
console.log(threadRecoveredData.messages);
```


#### Send a message

```ts
await thread.sendTextMessage('Message text');
```

#### Listen for new messages

```ts
thread.onThreadEvent(ChatEvent.MESSAGE_CREATED, (event: CustomEvent<ChatEventData>) => {
    if (!isMessageCreatedEvent(event.detail)) {
        return;
    }
    const message = event.detail.data.message;
    console.log(message);
});
```

#### Load more messages

```ts
const loadMoreMessageResponse = await thread.loadMoreMessages();
console.log(loadMoreMessageResponse.data.messages);
```

### Mark messages as read

```ts
await thread.lastMessageSeen();
```


### Livechat

Livechat channel needs to call `startChat()` method first to start the chat.
Customers might end the chat by calling `endChat()` method.

```ts
await thread.startChat();
```

Get position in queue:

```ts
sdk.onChatEvent(ChatEvent.SET_POSITION_IN_QUEUE, (event) => {
    if (isSetPositionInQueuePayload(event.detail)) {
        setQueuePosition(event.detail.data.positionInQueue);
    }
});
```

### Multi-thread


#### Get list of threads

```ts
const threads = await sdk.getThreadList();
```

#### Load metadata

```ts
const metadata = await thread.getMetadata();
```

#### Archive thread

```ts
await thread.archive();
```

#### Set thread name

```ts
await thread.setName('New thread name');
```


### Attachements

```ts
await thread.sendAttachments(fileList);
```

### Typing

Send typing events. Can be called multiple times, for example on every keypress:

```ts
thread.keystroke();
// Optionally call stopTyping() when the user stops typing or leaves
thread.stopTyping();
```

Receive typing events:

```ts
// Listen for START and STOP typing events
thread.onThreadEvent(ChatEvent.AGENT_TYPING_STARTED, (event: CustomEvent<ChatEventData>) => {
   // Do something with the event
});

thread.onThreadEvent(ChatEvent.AGENT_TYPING_STOPPED, (event: CustomEvent<ChatEventData>) => {
   // Do something with the event
});
```

### Assignemnt

```ts
sdk.onChatEvent(ChatEvent.ASSIGNED_AGENT_CHANGED, (event: CustomEvent<ChatEventData>) => {
    const agentName = parseAgentName((event.detail.data as AssignedAgentChangedData).inboxAssignee);
});
```

## Socket events
[Socket events documentation](docs_events/EVENTS.md)
