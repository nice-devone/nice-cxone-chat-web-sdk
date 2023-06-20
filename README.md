# nice-cxone-chat-web-sdk
Web SDK for DFO Chat is a library that allows you to quickly integrate a Chat functionality in your web application. 

## Requirements

- TypeScript 4.7 or higher
- A custom application bundler such as webpack, create-react-app, etc.

## Quickstart

Follow the steps below to quickly set up the Chat-Web-SDK in your application:

1. Import the SDK into your project.
2. Login to your Brand and create a Messaging Chat Channel, then set up their respective IDs in the SDK initialization.
3. Connect your project to the CXone environment.
4. Implement your own UI layer. You can take inspiration from the sample-app included in this repository.

## SDK Usage

Here's a detailed guide on how to use the different functionalities provided by the SDK:

### Import the SDK

First, import the SDK into your project:

```ts
import { ChatSdk, EnvironmentName, Thread, ChatEvent, ChatEventData } from '@nice-devone/nice-cxone-chat-web-sdk';
```

### Initialization

Next, initialize the Chat SDK with the required options:

```ts
const sdk = new ChatSdk({
  brandId: 123,
  channelId: 'my-channel-id',
  customerId: 'customer-id',
  environment: EnvironmentName.NA1
});
```

### Authorization

Authorize the Chat SDK:

```ts
await sdk.authorize()
```

## Thread Management

Get or create a Thread instance:

```ts
const thread = await sdk.getThread('thread-id');
// Optionally, recover a thread state (messages) from the server
const threadRecoveredData = await thread.recover();
```

### Send a message:

```ts
await thread.sendTextMessage('Message text');
```

### Listen for new messages:

```ts
thread.onThreadEvent(ChatEvent.MESSAGE_CREATED, (event: CustomEvent<ChatEventData>) => {
	event.detail.data.message;
});
```

### Load more messages:

```ts
const loadMoreMessageResponse = await thread.loadMoreMessages();
```

### Mark messages as read:

```ts
await thread.lastMessageSeen();
```

### Livechat Functionality

For a live chat channel, call the `startChat()` method to start the chat:

```ts
await thread.startChat();
```

Customers can end the chat by calling the `endChat()` method.

To get the position in the queue:

```ts
sdk.onChatEvent(ChatEvent.SET_POSITION_IN_QUEUE, (event) => {
    if (isSetPositionInQueuePayload(event.detail)) {
        setQueuePosition(event.detail.data.positionInQueue);
    }
});
```

## Multi-thread Support

### Get a list of threads:

```ts
const threads = await sdk.getThreadList();
```

### Load metadata:

```ts
const metadata = await thread.getMetadata();
```

### Archive a thread:

```ts
await thread.archive();
```

### Set a thread name:

```ts
await thread.setName('New thread name');
```

## Attachments

To send attachments:

```ts
await thread.sendAttachments(fileList);
```

## Typing Events

To send typing events (this can be called multiple times, e.g., on every keypress):

```ts
thread.keystroke();
// Optionally, call stopTyping() when the user stops typing or leaves 
thread.stopTyping();
```

To receive typing events:

```ts
// Listen for START and STOP typing events
thread.onThreadEvent(ChatEvent.AGENT_TYPING_STARTED, (event: CustomEvent<ChatEventData>) => {
   // Handle event
});

thread.onThreadEvent(ChatEvent.AGENT_TYPING_STOPPED, (event: CustomEvent<ChatEventData>) => {
   // Handle event
});
```

## Assignment

To assign a chat:

```ts
sdk.onChatEvent(ChatEvent.ASSIGNED_AGENT_CHANGED, (event: CustomEvent<ChatEventData>) => {
    const agentName = parseAgentName((event.detail.data as AssignedAgentChangedData).inboxAssignee);
});
```
