# NICE CXone Chat Web SDK

- [Official SDK Documentation](https://help.nice-incontact.com/content/acd/digital/chatsdk/chatwebsdk.htm)
- [NPM package](https://www.npmjs.com/package/@nice-devone/nice-cxone-chat-web-sdk)
- [Sample Web App](https://github.com/nice-devone/nice-cxone-chat-web-sample)

## Guides

In-depth developer guides live in [`docs_guides/`](docs_guides/):

- [Getting started](docs_guides/getting-started.md) — install, initialize, connect, and send your first message.
- [Configuration reference](docs_guides/configuration.md) — every `ChatSDKOptions` field, environments, storage, and channel info.
- [Authentication](docs_guides/authentication.md) — Secured Sessions, customer identity, and token lifecycle.
- [Connection, reconnect & heartbeat](docs_guides/connection-guidance.md) — the connection lifecycle, reconnect/recovery (recover after connect vs. reconnect), `FetchThreadList` vs `Recover`, and what the SDK handles for you.
- [Events & errors](docs_guides/events-and-errors.md) — the event catalog, type guards, and error handling.
- [Messaging & rich content](docs_guides/messaging-and-rich-content.md) — sending/receiving, rich content, streamed (GenAI) messages, and attachments.
- [Threads & livechat](docs_guides/threads-and-livechat.md) — messaging vs livechat, contacts/cases, custom fields, and group chat.
- [Proactive & visitors](docs_guides/proactive-and-visitors.md) — proactive actions, page views, and visitor tracking.
- [Migration](docs_guides/migration.md) — upgrading between SDK versions and replacing deprecated APIs.

## Requirements

- TypeScript **4.9+**
- Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, `crypto`, `EventSource`, etc.)
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
// Minimal setup — no persistence or caching
const sdk = new ChatSdk({
  brandId: 123,
  channelId: 'my-channel-id',
  customerId: 'customer-id',
  environment: EnvironmentName.EU1,
  cacheStorage: null,
  storage: null,
});
```

`cacheStorage` and `storage` are required. Pass `null` if you do not want the SDK to cache or persist anything. For production use, pass real instances so customer identity, scroll tokens and other state survive page reloads:

```ts
import ChatSdk, { CacheStorage, EnvironmentName } from '@nice-devone/nice-cxone-chat-web-sdk';

const sdk = new ChatSdk({
  brandId: 123,
  channelId: 'my-channel-id',
  customerId: 'customer-id',
  environment: EnvironmentName.EU1,
  cacheStorage: new CacheStorage(window.localStorage),
  storage: window.localStorage,
});
```

### Connect to server

By default, the SDK will not automatically connect to the server. You need to call the `connect()` method to establish a connection.
```ts
await sdk.connect()
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
const thread = sdk.getThread('thread-id');
// Optionally recover a thread state (messages) from the server
const threadRecoveredData = await thread.recover();
console.log(threadRecoveredData.messages);
```

`getThread()` is synchronous — it returns a `Thread` (or `LivechatThread` for livechat channels) without any network call.


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

`loadMoreMessages()` returns `null` when there are no more messages to load (no scroll token), so the result must be null-checked:

```ts
const loadMoreMessageResponse = await thread.loadMoreMessages();
if (loadMoreMessageResponse !== null) {
    console.log(loadMoreMessageResponse.data.messages);
}
```

### Mark messages as read

```ts
await thread.lastMessageSeen();
```


### Livechat

`startChat()` and `endChat()` are available **only on livechat channels** — they are methods of `LivechatThread`, which is the concrete type returned by `sdk.getThread(...)` when the channel is configured as livechat. Livechat channel needs to call `startChat()` method first to start the chat. Customers might end the chat by calling `endChat()` method.

```ts
const thread = sdk.getThread('thread-id') as LivechatThread;
await thread.startChat();
```

Get position in queue:

```ts
sdk.onChatEvent(ChatEvent.SET_POSITION_IN_QUEUE, (event) => {
    if (isSetPositionInQueueEvent(event)) {
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


### Attachments

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

thread.onThreadEvent(ChatEvent.AGENT_TYPING_ENDED, (event: CustomEvent<ChatEventData>) => {
   // Do something with the event
});
```

### Assignment

```ts
sdk.onChatEvent(ChatEvent.ASSIGNED_AGENT_CHANGED, (event) => {
    const assignee = event.detail.data.inboxAssignee;
    const agentName = `${assignee?.firstName ?? ''} ${assignee?.surname ?? ''}`.trim();
});
```

## Socket events
[Socket events documentation](docs_events/EVENTS.md)
