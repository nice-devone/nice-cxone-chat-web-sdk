# Chat Web SDK — Messaging & Rich Content

How to send messages from your application, receive and render them (including rich content and GenAI streamed replies), load history, track read state, upload attachments, and drive a persistent menu. The patterns here mirror what the reference chat widget does in production.

This guide assumes you already have a connected SDK and an open `Thread` — see **[getting-started.md](./getting-started.md)** and **[threads-and-livechat.md](./threads-and-livechat.md)** for how to get there. All examples import from the public package:

```ts
import {
  ChatSdk,
  ChatEvent,
  MessageType,
  isMessageCreatedEvent,
  isMessageReadChangedEvent,
  isStreamedMessageEventData,
  UploadAttachmentError,
} from '@nice-devone/nice-cxone-chat-web-sdk';
```

---

## Sending messages

You send from a `Thread` instance (the one you opened or recovered). Every send method resolves to a `MessageSuccessEventData` (an **acknowledgement**, not the rendered message — see *Optimistic send & ordering*).

### `thread.sendTextMessage(text, options?)`

The everyday path. Wraps your string in a `TEXT` message content and sends it.

```ts
await thread.sendTextMessage('Hi, I need help with my order');
```

`options` lets you supply your own `messageId` (otherwise the SDK generates one) and `browserFingerprint`. The `messageId` is the value you'll later match against to reconcile the optimistic bubble (see below), so capture it if you provided one.

> **Empty text throws.** Sending a `TEXT` message with no text **and** no attachments rejects with `SendMessageFailedError` (`"Message content cannot be empty for text message"`). Validate the input field before calling, or only send when there's text or at least one attachment.

### `thread.sendPostbackMessage(postback, text, options?)`

Use this to **reply to interactive content** — a quick-reply chip, a list-picker option, or a persistent-menu item. The `postback` is the machine-readable value the backend expects; the `text` is the human-readable label to display in the conversation.

```ts
// User tapped a quick reply whose postback is 'ORDER_STATUS' and label is 'Order status'
await thread.sendPostbackMessage('ORDER_STATUS', 'Order status');
```

> **`MessageType.POSTBACK` is deprecated.** Postbacks now ride on a `TEXT` message — the SDK sets `type: MessageType.TEXT` and carries the `postback` value on the message content. You don't need to think about this; just call `sendPostbackMessage` and the SDK shapes the payload correctly.

### `thread.sendMessage(messageData)` — the low-level call

`sendTextMessage`, `sendPostbackMessage`, and `sendAttachments` are all thin wrappers around `sendMessage`, which takes a fully-formed `SendMessageEventData`. Reach for it only when you need to construct message content the helpers don't cover. The same empty-text rule applies (it runs `assertNonEmptyTextMessageContent` internally).

```ts
await thread.sendMessage({
  messageContent: { type: MessageType.TEXT, payload: { text: 'Custom' } },
  idOnExternalPlatform: myMessageId,
  thread: { idOnExternalPlatform: thread.idOnExternalPlatform },
  attachments: [],
  consumer: { customFields: [] },
  consumerContact: { customFields: [] },
  browserFingerprint, // from getBrowserFingerprint()
});
```

### `thread.sendOutboundMessage(messageData)`

Sends a `SendOutboundEventData`. Used for outbound-initiated conversations; the shape and contract match `sendMessage` (resolves to `MessageSuccessEventData`, throws `SendMessageFailedError`). Most consumer-facing widgets never need this.

### `sdk.sendOfflineMessage(data)` — offline channels

When a livechat channel is **offline** and configured to collect a message instead of starting a live session, send it through the SDK (not a thread):

```ts
await sdk.sendOfflineMessage({
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'Please call me back about my refund.',
});
```

The argument is an `OfflineMessageData` with exactly three string fields — `name`, `email`, `message`. It resolves to `MessageSuccessEventData` or throws `SendMessageFailedError`. Show your offline form only when the channel is offline (check `channelInfo.availability.status` / `settings.liveChatShowOfflineForm`).

---

## Optimistic send & ordering

`MessageSuccessEventData` is an **acknowledgement** — `{ id, ... }` where `id` is the event id of the accepted send. It is **not** the full, renderable message: it has no author, no formatted content, no server timestamp. So you can't render directly from it.

The full message arrives separately, as a push event. Two events matter, and **their order is guaranteed**:

> `MESSAGE_SENT` arrives **before** `MESSAGE_CREATED` — by design, so the client can show the message faster (see `docs_events/EVENTS.md`).

- **`MESSAGE_SENT`** (`ChatEvent.MESSAGE_SENT`) — carries a **`SentMessage`** (a lean message: `idOnExternalPlatform`, `messageContent`, `direction`, `attachments`, `authorUser`, `createdAt`, `threadIdOnExternalPlatform`). It deliberately has **no server `id`** yet.
- **`MESSAGE_CREATED`** (`ChatEvent.MESSAGE_CREATED`) — carries the **full `Message`** (with `id`, `createdAtWithMilliseconds`, `seen`, `delivered`, `case`/contact context, etc.).

The robust pattern is: add an **optimistic bubble** the moment `MESSAGE_SENT` fires, then **reconcile** it when `MESSAGE_CREATED` follows. Match the two by **`idOnExternalPlatform`** — it's the only id present in both, since `SentMessage` carries no server `id`.

```ts
thread.onThreadEvent(ChatEvent.MESSAGE_SENT, (event) => {
  const sent = event.detail.data.message; // SentMessage — no server `id`
  upsertBubble({
    key: sent.idOnExternalPlatform,        // match key
    status: 'sent',                        // single check / "sending"
    content: sent.messageContent,
    direction: sent.direction,
  });
});

thread.onThreadEvent(ChatEvent.MESSAGE_CREATED, (event) => {
  if (!isMessageCreatedEvent(event.detail)) {
    return;
  }
  const message = event.detail.data.message; // full Message — has `id`
  upsertBubble({
    key: message.idOnExternalPlatform,       // same key → reconcile, don't duplicate
    serverId: message.id,
    status: 'delivered',
    content: message.messageContent,
    direction: message.direction,
    createdAt: message.createdAtWithMilliseconds,
  });
});
```

Keying on `idOnExternalPlatform` (rather than appending on each event) means a `MESSAGE_SENT` immediately followed by `MESSAGE_CREATED` updates **one** bubble instead of rendering two. The same `idOnExternalPlatform` is the value you (optionally) supplied as `messageId` when sending your own outbound message, so your own messages reconcile too.

> Use `direction` (`'inbound'` = from the consumer, `'outbound'` = from agent/bot) to decide which side of the conversation a bubble belongs on.

---

## Receiving & history

### Listening for new messages

Subscribe with the thread's `onThreadEvent` (auto-filtered to *this* thread) or the SDK's `onChatEvent` (fires for **all** threads — you filter yourself). Both hand you a `ChatCustomEvent` whose payload is on **`event.detail`**, and both return an unsubscribe function. Narrow with the exported guard before reading typed fields:

```ts
const off = thread.onThreadEvent(ChatEvent.MESSAGE_CREATED, (event) => {
  if (!isMessageCreatedEvent(event.detail)) {
    return;
  }
  renderMessage(event.detail.data.message); // full Message
});

// later, to stop listening:
off();
```

See **[events-and-errors.md](./events-and-errors.md)** for the full catalog of `ChatEvent` members and where to subscribe to each.

### Loading older history — `thread.loadMoreMessages()`

To page backwards through history (e.g. when the user scrolls up), call `loadMoreMessages()`. It uses the SDK's stored scroll token.

> **It returns `null` when there's nothing more to load** — always null-check. A `null` result means you've reached the top of the conversation; stop requesting and hide your "load more" affordance.

```ts
async function loadOlder() {
  const result = await thread.loadMoreMessages(); // MoreMessagesLoadedEvent | null

  if (result === null) {
    setReachedStart(true); // no more history
    return;
  }

  prependMessages(result.data.messages);
}
```

On failure it throws `LoadMoreMessagesFailedError`. The arrival of the older batch is also observable as `ChatEvent.MORE_MESSAGES_LOADED` if you prefer an event-driven flow.

### Read receipts

- **Mark the thread as seen** — call `thread.lastMessageSeen()` when the consumer has the conversation open and has viewed the latest messages. This tells the backend the consumer read up to the latest message.

  ```ts
  await thread.lastMessageSeen();
  ```

- **React to read-state changes** — listen for `ChatEvent.MESSAGE_READ_CHANGED` to update "Seen"/"Read" indicators (e.g. when an agent reads the consumer's message). Narrow with `isMessageReadChangedEvent`:

  ```ts
  thread.onThreadEvent(ChatEvent.MESSAGE_READ_CHANGED, (event) => {
    if (!isMessageReadChangedEvent(event.detail)) {
      return;
    }
    updateReadReceipt(event.detail.data.message);
  });
  ```

---

## The message model & rich content

A `Message` carries its renderable payload in **`message.messageContent`**, whose `type` is a `MessageType`. The full enum:

| `MessageType` | SDK exposes a content shape? | Notes |
|---|---|---|
| `TEXT` | ✅ `MessageTextContent` | Plain text (and postback replies — they ride on `TEXT`). |
| `QUICK_REPLIES` | ✅ `QuickRepliesMessageContent` | Chips/buttons; reply with `sendPostbackMessage`. |
| `LIST_PICKER` | ✅ `ListPickerMessageContent` | Selectable list; reply with `sendPostbackMessage`. |
| `RICH_LINK` | ✅ `RichLinkMessageContent` | A link with media + title. |
| `STREAMED` | ✅ `StreamedMessageContent` | GenAI streamed reply — **handled via streamed events, not `MESSAGE_CREATED`** (see next section). |
| `FILE` | ❌ | No exported shape — render via `message.attachments` and a fallback. |
| `FORM` | ❌ | No exported shape — render a fallback. |
| `PLUGIN` | ❌ | No exported shape — render a fallback. |
| `ADAPTIVE_CARD` | ❌ (raw `payload`) | No typed shape, but `messageContent.payload` is the [Adaptive Card](https://adaptivecards.io/) JSON — render it with the [`adaptivecards`](https://www.npmjs.com/package/adaptivecards) library (see below). |
| `TIME_PICKER` | ❌ | No exported shape — render a fallback. |
| `POSTBACK` | ❌ (deprecated) | Deprecated; postbacks now arrive as `TEXT`. |

The SDK exports a discriminated `MessageContent` union for the five types that have shapes (`MessageTextContent | QuickRepliesMessageContent | ListPickerMessageContent | RichLinkMessageContent | StreamedMessageContent`). Render with a `switch` on `messageContent.type`, and give every unmodelled type a sensible fallback (use the optional `messageContent.fallbackText` if present):

```ts
function renderContent(message) {
  const content = message.messageContent;

  switch (content.type) {
    case MessageType.TEXT:
      // content.payload.text
      return renderText(content.payload.text ?? '');

    case MessageType.QUICK_REPLIES:
      // content.payload.text.content + actions[] ({ type, text, postback })
      return renderQuickReplies(
        content.payload.text.content,
        content.payload.actions,
        (action) => thread.sendPostbackMessage(action.postback, action.text),
      );

    case MessageType.LIST_PICKER:
      // content.payload.title.content, .text.content, actions[] ({ text, postback?, icon?, description? })
      return renderListPicker(
        content.payload.title.content,
        content.payload.actions,
        (option) =>
          option.postback &&
          thread.sendPostbackMessage(option.postback, option.text),
      );

    case MessageType.RICH_LINK:
      // content.payload.url, .title.content, .media ({ url, fileName, mimeType })
      return renderRichLink(content.payload);

    case MessageType.STREAMED:
      // Normally you won't hit this here — streamed messages come via the
      // STREAMED_MESSAGE_* events, not MESSAGE_CREATED. See below.
      return renderStreamingPlaceholder();

    case MessageType.ADAPTIVE_CARD:
      // No typed shape, but content.payload is the raw Adaptive Card JSON —
      // hand it straight to the adaptivecards library (see below).
      return renderAdaptiveCard(content.payload);

    default:
      // FILE / FORM / PLUGIN / TIME_PICKER and anything new.
      return renderFallback(content.fallbackText ?? 'Unsupported message');
  }
}
```

**Adaptive Cards (`ADAPTIVE_CARD`).** The SDK doesn't model this type, but `messageContent.payload` **is** the raw Adaptive Card JSON. Pass it straight to Microsoft's [`adaptivecards`](https://www.npmjs.com/package/adaptivecards) library — `parse()` the payload, then `render()` to a DOM element you append to your message bubble:

```ts
import * as AdaptiveCards from 'adaptivecards';

function renderAdaptiveCard(payload) {
  const card = new AdaptiveCards.AdaptiveCard();
  card.parse(payload);          // payload === message.messageContent.payload
  return card.render();         // an HTMLElement — append it to your bubble
}
```

(Optionally call `card.onExecuteAction` to handle `Action.Submit` / `Action.OpenUrl` from the card, and apply a `HostConfig` for theming — see the `adaptivecards` docs.)

**Responding to interactive content.** For `QUICK_REPLIES` and `LIST_PICKER`, each action/option carries a `postback`. When the user picks one, reply with `thread.sendPostbackMessage(postback, label)` — the label is what shows in the conversation as the consumer's reply.

---

## Streamed / GenAI messages

A streamed (GenAI) reply does **not** arrive as a normal `MESSAGE_CREATED` that you render once. The SDK detects a `STREAMED` message, **swallows the original `MESSAGE_CREATED`**, opens a Server-Sent-Events stream to the backend, and re-emits the content to you as a sequence of streamed events:

```
STREAMED_MESSAGE_STARTED
  → STREAMED_MESSAGE_DELTA   (repeated, one per chunk)
  → STREAMED_MESSAGE_COMPLETED   (success)
       — or —
  → STREAMED_MESSAGE_FAILED      (stream broke)
```

All four are `ChatEvent` members, and all four carry a **`StreamedMessageEventData`** on `event.detail.data`:

```ts
interface StreamedMessageEventData {
  delta?: StreamedMessageDelta; // { content } — the latest chunk only (absent on STARTED)
  fullContent: string;          // content accumulated SO FAR — render THIS
  messageId: string;
  originalMessage: Message;     // author, threadId, createdAt, messageContent, etc.
  threadId: string;
}
```

Key rules when rendering:

1. **Narrow with `isStreamedMessageEventData(event.detail.data)`** — note it takes **`event.detail.data`**, *not* `event.detail`. (Internally the guard checks `originalMessage.messageContent.type === STREAMED` and that `fullContent` is a string.)
2. **Render `fullContent`, not `delta`.** `fullContent` is the running accumulation; rendering it each time gives you a smoothly growing bubble. `delta.content` is only the newest chunk — use it only if you're doing your own append.
3. **Use `originalMessage`** for author, avatar, timestamp, and direction — the streamed events don't repeat those fields at the top level.
4. **Handle `STREAMED_MESSAGE_FAILED`** by showing whatever partial `fullContent` you've accumulated (the failed event still carries the content so far) plus an error affordance — don't drop the bubble.

```ts
function attachStreamedHandlers(thread) {
  const upsert = (event, status) => {
    const data = event.detail.data;
    if (!isStreamedMessageEventData(data)) {
      return;
    }
    upsertBubble({
      key: data.messageId,
      author: data.originalMessage.authorUser,
      direction: data.originalMessage.direction,
      content: data.fullContent, // accumulated — not data.delta
      status,                    // 'streaming' | 'done' | 'failed'
    });
  };

  thread.onThreadEvent(ChatEvent.STREAMED_MESSAGE_STARTED, (e) => upsert(e, 'streaming'));
  thread.onThreadEvent(ChatEvent.STREAMED_MESSAGE_DELTA, (e) => upsert(e, 'streaming'));
  thread.onThreadEvent(ChatEvent.STREAMED_MESSAGE_COMPLETED, (e) => upsert(e, 'done'));
  thread.onThreadEvent(ChatEvent.STREAMED_MESSAGE_FAILED, (e) => upsert(e, 'failed'));
}
```

> On `STARTED`, `fullContent` is an empty string — render an empty/typing bubble and let the deltas fill it in.

---

## Attachments

### Pre-validate before showing the picker — the SDK does **not**

The SDK does not pre-validate files. **Check the channel's restrictions yourself** before opening the file picker, using `channelInfo.settings.fileRestrictions` (a `FileRestrictionsSettings`):

```ts
const { isAttachmentsEnabled, allowedFileSize, allowedFileTypes } =
  channelInfo.settings.fileRestrictions;

// isAttachmentsEnabled: boolean — hide the attach button entirely if false
// allowedFileSize: string — e.g. the max size to enforce client-side
// allowedFileTypes: Array<{ description: string; mimeType: string }> — build your <input accept="...">
```

Hide the attach affordance when `isAttachmentsEnabled` is `false`, set your `<input type="file" accept="...">` from `allowedFileTypes`, and reject oversized files against `allowedFileSize` before uploading.

### `thread.sendAttachments(files, options?)`

Accepts a `FileList` (straight from an `<input type="file">`), an array of `File`, or an array of already-uploaded `AttachmentUpload` objects. It uploads each file and sends a message carrying them, resolving to `MessageSuccessEventData`.

```ts
const input = document.querySelector('input[type=file]');

input.addEventListener('change', async () => {
  if (!input.files || input.files.length === 0) {
    return; // empty selection throws — guard first
  }
  try {
    await thread.sendAttachments(input.files);
  } catch (error) {
    if (error instanceof UploadAttachmentError) {
      // Server rejected it — error.data.response carries the authoritative restrictions:
      const { allowedFileSize, allowedFileTypes } = error.data.response;
      showAttachmentError(allowedFileSize, allowedFileTypes);
    } else {
      throw error;
    }
  }
});
```

> Passing an empty/undefined file list throws (`"FileList must be provided to sendAttachment method"`). Guard against an empty selection.

If the server rejects the upload, `sendAttachments` throws `UploadAttachmentError`, and **`error.data.response`** (an `UploadFailResponse`) carries the server's own `allowedFileSize` and `allowedFileTypes` — surface those to the user so they know what's allowed even if your client-side rules were stale.

### Rendering received attachments

Both `Message` and `SentMessage` carry an `attachments` array. Render them alongside (or instead of) the text content:

```ts
function renderAttachments(message) {
  return message.attachments.map((a) => renderAttachment(a)); // url, friendlyName, mimeType, …
}
```

A `FILE`-type message has no exported content shape, so for those rely on `message.attachments` plus a fallback.

---

## Persistent menu

A channel can be configured with a **persistent menu** — a fixed set of shortcut actions. Fetch the items with `sdk.getPersistentMenuItems()`:

```ts
const items = await sdk.getPersistentMenuItems(); // Array<PersistentMenuItem>
```

Each `PersistentMenuItem` is `{ id: string; label: string; postback: string }`. Render the `label`s as a menu; when the user taps one, reply with the item's `postback` (and show the `label`):

```ts
function renderPersistentMenu(items, thread) {
  return items.map((item) => ({
    id: item.id,
    label: item.label,
    onTap: () => thread.sendPostbackMessage(item.postback, item.label),
  }));
}
```

`getPersistentMenuItems()` throws `ChatSDKError` if the fetch fails. Whether to show the menu at all is a channel setting (`channelInfo.settings.enablePersistentMenu`); gate your UI on it. The menu is empty if the channel has no items configured.

---

## Related guides

- **[getting-started.md](./getting-started.md)** — install, initialize, open a thread, send and receive your first messages.
- **[threads-and-livechat.md](./threads-and-livechat.md)** — the full thread lifecycle: messaging vs livechat, starting/ending chats, archiving, thread state.
- **[events-and-errors.md](./events-and-errors.md)** — the full catalog of push events and SDK error types, and how to subscribe and handle them.
