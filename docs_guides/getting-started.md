# Getting Started with the NICE CXone Chat Web SDK

The Chat Web SDK lets you embed a real-time chat experience — backed by NICE CXone's Digital First Omnichannel (DFO) platform — directly into your website. It manages the WebSocket connection to the chat gateway, customer identity, message delivery, and live agent events, leaving you free to build your own UI.

## What you'll learn

- The core concepts the SDK is built around (brands, channels, threads, contacts, messages, agents).
- How to install, initialize, and connect the SDK.
- How to inspect a channel before you connect.
- How to open a thread, send a first message, and receive incoming messages.

---

## Concepts primer

You don't need to be a CXone expert to use the SDK, but a handful of domain terms appear throughout the API.

| Term | What it means |
|---|---|
| **Brand** | Your company/account in CXone, identified by a numeric `brandId`. All chat configuration lives under a brand. |
| **Channel** | A single configured chat entry point on a brand, identified by `channelId`. A channel is either *messaging* or *livechat* (see below). You always initialize the SDK against one brand + one channel. |
| **Messaging channel** *(multi-thread)* | An asynchronous channel where a customer can hold several long-lived conversations at once. The SDK exposes `getThreadList()`, thread naming, and archiving here. |
| **Livechat channel** *(single-session)* | A synchronous, agent-routed session. Chat must be explicitly started (`startChat()`) and can be ended (`endChat()`), and the customer may wait in a queue. The SDK returns a `LivechatThread` for these channels. |
| **Thread** | One conversation within a channel, identified by a thread ID. It carries the message history and is your main handle for sending and receiving messages. |
| **Contact** (a.k.a. **case**) | A single routed interaction created from a thread — the unit an agent actually picks up and works. One thread can produce multiple contacts over its lifetime (e.g. a new contact each time the customer re-engages after closure). |
| **Message** | A single item in a thread — text, an attachment, or rich content — authored by the customer or an agent. |
| **Customer / end-user** | The person chatting from your website. You identify them with a `customerId` (or let secured sessions establish identity for you). |
| **Agent** | A human (or bot) on the CXone side who handles the contact. Agent assignment and typing surface as events. |
| **Visitor / visit** | Lightweight analytics identifiers for the browsing person (`visitorId`) and their current browsing session (`visitId`). They are generated for you if you don't supply them and mainly matter for proactive chat and analytics. |

---

## Requirements

- **TypeScript 4.9+** (the SDK ships its own type definitions).
- An **ES2022** runtime. The SDK relies on standard browser APIs including `WebSocket`, `EventSource`, `crypto`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, and `Date`.
- A **module bundler** (webpack, Vite, the Create React App toolchain, etc.). The SDK is distributed as ES modules and is meant to be bundled into your app.

---

## Install

```bash
npm install @nice-devone/nice-cxone-chat-web-sdk
```

---

## Initialize

Import the default export and create an instance with your brand, channel, and region. `storage` and `cacheStorage` are **required** options — pass `null` to disable persistence and caching, or pass real implementations to enable them (see below).

```ts
import ChatSdk, { EnvironmentName } from '@nice-devone/nice-cxone-chat-web-sdk';

// Minimal setup — no persistence or caching
const sdk = new ChatSdk({
  brandId: 1234,
  channelId: 'chat_abcd1234-...',
  customerId: 'your-customer-id',
  environment: EnvironmentName.EU1,
  storage: null,
  cacheStorage: null,
});
```

For production, pass real storage so that customer identity, scroll tokens, and other session state survive page reloads. `CacheStorage` is a small TTL wrapper around any `Storage` instance (such as `window.localStorage`), and `storage` accepts a `Storage`-compatible object directly.

```ts
import ChatSdk, { CacheStorage, EnvironmentName } from '@nice-devone/nice-cxone-chat-web-sdk';

const sdk = new ChatSdk({
  brandId: 1234,
  channelId: 'chat_abcd1234-...',
  customerId: 'your-customer-id',
  environment: EnvironmentName.EU1,
  storage: window.localStorage,
  cacheStorage: new CacheStorage(window.localStorage),
});
```

A few notes on the required options:

- **`brandId`** and **`channelId`** identify the channel you're connecting to. Create a chat channel in your CXone brand to obtain them.
- **`customerId`** is required **unless** you use secured sessions (`securedSession`), in which case the platform establishes identity for you. See [authentication.md](./authentication.md).
- **`environment`** selects the CXone region your brand lives in (for example `EnvironmentName.EU1`, `NA1`, `AU1`). Picking the wrong region means the SDK talks to the wrong gateway. For the full list of environments, custom endpoints, and other options, see [configuration.md](./configuration.md).

---

## Connect

The SDK does **not** connect automatically. Open the WebSocket explicitly with `connect()`, which is asynchronous:

```ts
await sdk.connect();
```

`connect()` resolves to `true` when it creates the connection and `false` if a connection already exists — it never opens a second socket. Call it once per page lifetime; the SDK owns reconnection, heartbeat, and token refresh from there. For the full connection and reconnect lifecycle (events, secured-session vs. legacy auth, and anti-patterns), read [connection-guidance.md](./connection-guidance.md).

---

## Inspect the channel before connecting

You can query channel configuration and availability **without opening a connection**. This is useful for deciding whether to show the widget at all, or for rendering an offline form when no agents are available.

```ts
const info = await sdk.getChannelInfo();
const { status } = await sdk.getChannelAvailability(); // 'online' | 'offline'
```

`getChannelInfo()` returns a `ChannelInfo` object describing the channel, including:

- **`isLiveChat`** — whether this is a livechat (single-session) channel.
- **`settings`** — channel settings such as **file upload restrictions** (`settings.fileRestrictions`) and **feature flags** (`settings.features`).
- **`translations`** — localized strings for the configured language.

Both calls are also available as standalone functions (`getChannelInfo(...)` / `getChannelAvailability(...)`) if you want channel data before constructing an SDK instance. See [configuration.md](./configuration.md) for the full shape and the standalone signatures.

---

## Open a thread and send your first message

A `Thread` is your handle to one conversation. Get it with `getThread(threadId)` — this is **synchronous** and performs no network request; it returns a `Thread` for messaging channels and a `LivechatThread` for livechat channels. You provide the thread ID (generate one with the exported `generateId()` helper, or reuse a stored ID to return to an existing conversation). Call it only after `connect()` has resolved — `getThread()` throws a `ChatSDKError` if the SDK is not connected.

```ts
import { ChatEvent, isMessageCreatedEvent } from '@nice-devone/nice-cxone-chat-web-sdk';
import type { ChatEventData } from '@nice-devone/nice-cxone-chat-web-sdk';

const thread = sdk.getThread('my-thread-id'); // synchronous

// Listen for new messages BEFORE sending, so you don't miss anything.
thread.onThreadEvent(
  ChatEvent.MESSAGE_CREATED,
  (event: CustomEvent<ChatEventData>) => {
    if (!isMessageCreatedEvent(event.detail)) {
      return;
    }
    const { message } = event.detail.data;
    console.log('New message:', message);
  },
);

// Optionally load existing history (asynchronous).
const recovered = await thread.recover();
console.log('Recovered messages:', recovered.messages);

// Send a text message (asynchronous).
await thread.sendTextMessage('Hello! I need some help.');
```

Notes:

- **`onThreadEvent(type, handler)`** registers a listener scoped to this thread and returns a function you can call to unregister it. The handler receives a `CustomEvent`; narrow its `detail` with the appropriate type guard — here `isMessageCreatedEvent` — before reading `event.detail.data`.
- **`recover()`** loads the thread's state (message history, contact, etc.) from the server. It is asynchronous and rejects with `ThreadRecoverFailedError` if the thread doesn't exist, so wrap it in `try/catch` (or skip it entirely for a brand-new conversation).
- **`sendTextMessage(text)`** sends a message and resolves once it's accepted.

> **Livechat channels:** on a livechat channel the customer's session must be started before messages flow — call `await (thread as LivechatThread).startChat()` instead of (or before) `sendTextMessage`. See [threads-and-livechat.md](./threads-and-livechat.md).

---

## A complete minimal example

```ts
import ChatSdk, {
  ChatEvent,
  EnvironmentName,
  generateId,
  isMessageCreatedEvent,
} from '@nice-devone/nice-cxone-chat-web-sdk';
import type { ChatEventData } from '@nice-devone/nice-cxone-chat-web-sdk';

async function startChat() {
  // 1. Initialize.
  const sdk = new ChatSdk({
    brandId: 1234,
    channelId: 'chat_abcd1234-...',
    customerId: generateId(), // a stable per-user id in real apps
    environment: EnvironmentName.EU1,
    storage: null,
    cacheStorage: null,
    onError: (error) => console.error('Chat SDK error:', error),
  });

  // 2. (Optional) Check availability before showing any UI.
  const { status } = await sdk.getChannelAvailability();
  if (status === 'offline') {
    console.log('No agents available right now.');
  }

  // 3. Connect once.
  await sdk.connect();

  // 4. Open a thread and listen for messages.
  const thread = sdk.getThread(generateId());
  thread.onThreadEvent(
    ChatEvent.MESSAGE_CREATED,
    (event: CustomEvent<ChatEventData>) => {
      if (isMessageCreatedEvent(event.detail)) {
        console.log('Message:', event.detail.data.message);
      }
    },
  );

  // 5. Send the first message.
  await thread.sendTextMessage('Hi there!');
}

startChat();
```

---

## Next steps

- **[configuration.md](./configuration.md)** — environments, custom endpoints, channel info, and all SDK options.
- **[authentication.md](./authentication.md)** — secured sessions and customer identity.
- **[connection-guidance.md](./connection-guidance.md)** — connection lifecycle, reconnect, and auth events.
- **[events-and-errors.md](./events-and-errors.md)** — the event model, type guards, and SDK error types.
- **[messaging-and-rich-content.md](./messaging-and-rich-content.md)** — attachments, postbacks, quick replies, and rich messages.
- **[threads-and-livechat.md](./threads-and-livechat.md)** — multi-thread vs. livechat, queues, typing, and read receipts.
- **[proactive-and-visitors.md](./proactive-and-visitors.md)** — proactive chat, visitors, and visits.
- **[migration.md](./migration.md)** — upgrading between SDK versions.

External resources:

- [Official SDK documentation](https://help.nice-incontact.com/content/acd/digital/chatsdk/chatwebsdk.htm)
- [Sample web app](https://github.com/nice-devone/nice-cxone-chat-web-sample)
