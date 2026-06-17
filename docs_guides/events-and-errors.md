# Chat Web SDK — Events & Error Handling

Everything the SDK tells your application happens through **events** and **errors**. The SDK owns the WebSocket and pushes updates to you; your job is to subscribe to the events you care about and to install one error callback. This guide covers the event system, the catalog of events a client listens to, the type-narrowing guards, and the full error model.

All examples import from the public package:

```ts
import ChatSdk, { ChatEvent /* …guards, errors… */ } from '@nice-devone/nice-cxone-chat-web-sdk';
```

---

## The event system

There are three ways to observe what the SDK is doing.

| API | Level | Thread filter | Returns | Use it for |
|---|---|---|---|---|
| `sdk.onChatEvent(type, handler)` | SDK | No — fires for **every** thread | `RemoveListenerFunction` | App-wide concerns (queue position, proactive, contact state). |
| `thread.onThreadEvent(type, handler)` | Thread | Yes — only events whose payload matches **this** thread's id | `RemoveListenerFunction` | Per-conversation UI (messages, typing, this thread's status). |
| `sdk.onRawEvent` (option) / `onRawEvent` callback | SDK | No | n/a | Inspecting/debugging the raw event stream before any mapping. |

Both `onChatEvent` and `onThreadEvent` take a `ChatEvent` member as the `type` and a handler that receives a `ChatCustomEvent` — a standard DOM `CustomEvent` whose payload lives on `event.detail`. Both return a `RemoveListenerFunction` (`() => void`); **call it to unsubscribe**.

```ts
// SDK-level — fires for any thread
const off = sdk.onChatEvent(ChatEvent.MESSAGE_CREATED, (event) => {
  console.log('message in some thread', event.detail.data);
});

// later, e.g. on component unmount
off();
```

```ts
// Thread-level — only this thread's events reach the handler
const thread = sdk.getThread(threadId);

const offTyping = thread.onThreadEvent(ChatEvent.AGENT_TYPING_STARTED, (event) => {
  showTypingIndicator();
});
```

The thread filter is applied **inside** `onThreadEvent`: the handler is wrapped so that events whose payload carries a *different* thread id are dropped. If you subscribe with `onChatEvent` instead, you receive that event for **all** threads and must filter yourself.

`onRawEvent` is a constructor option (`RawEventCallback`), not a subscribe method. It is invoked with the raw `ChatCustomEvent` for **every** incoming event, before the SDK's internal mapping runs. Use it for logging, tracing, or routing events into your own dispatcher:

```ts
const sdk = new ChatSdk({
  brandId, channelId, environment,
  onRawEvent: (event) => debugLog(event.type, event.detail),
  onError:    (error) => report(error),
});
```

> **Catch-up vs future delivery.** Subscriptions deliver *future* events only. After a (re)connect, re-fetch any state you need to display — see [connection-guidance.md](./connection-guidance.md).

---

## ChatEvent catalog

`ChatEvent` is a frozen object of event types. Always reference members by name (`ChatEvent.MESSAGE_CREATED`) rather than by their string value — the string values are an internal protocol detail.

The events below are the ones a client application typically listens to. "Level" indicates where you would normally subscribe: **Thread** for per-conversation events (use `onThreadEvent`), **SDK** for app-wide events (use `onChatEvent`). All events are technically observable from both APIs; the level column is the recommended placement.

### Message events

| Event | Level | When it fires |
|---|---|---|
| `ChatEvent.MESSAGE_CREATED` | Thread | A new message (from agent, bot, or system) is added to the thread. |
| `ChatEvent.MESSAGE_SENT` | Thread | A message you sent has been accepted by the backend. |
| `ChatEvent.MESSAGE_UPDATED` | Thread | An existing message was edited/updated. |
| `ChatEvent.MESSAGE_ADDED_INTO_CASE` | Thread | A message was attached to the contact/case. |
| `ChatEvent.MESSAGE_DELIVERY_STATUS_CHANGED` | Thread | Delivery state of a message changed. |
| `ChatEvent.MESSAGE_SEEN_CHANGED` | Thread | The "seen" state of a message changed. |
| `ChatEvent.MESSAGE_READ_CHANGED` | Thread | The "read" state of a message changed (e.g. agent read the consumer's message). |
| `ChatEvent.MORE_MESSAGES_LOADED` | Thread | Older history requested via the thread's load-more call has arrived. |

### Typing indicators

| Event | Level | When it fires |
|---|---|---|
| `ChatEvent.AGENT_TYPING_STARTED` | Thread | The agent started typing in this thread. |
| `ChatEvent.AGENT_TYPING_ENDED` | Thread | The agent stopped typing in this thread. |

> The underlying protocol emits `SENDER_TYPING_STARTED` / `SENDER_TYPING_ENDED` for *both* directions. The SDK inspects the typing payload and, for **outbound** (agent → consumer) typing, re-tags the event as `AGENT_TYPING_STARTED` / `AGENT_TYPING_ENDED`. Subscribe to the `AGENT_TYPING_*` members to drive an "agent is typing…" indicator. Inbound (consumer-side) typing is **not** re-tagged — it stays as `SENDER_TYPING_STARTED` / `SENDER_TYPING_ENDED`, which clients normally don't need to handle.

### Contact / Case events

NICE CXone renamed "Case" to "Contact". The `CASE_*` members still exist as `@deprecated` aliases that resolve to the **same** underlying event as their `CONTACT_*`/`ASSIGNED_*` counterparts — prefer the new names in new code.

| Event | Level | When it fires |
|---|---|---|
| `ChatEvent.CONTACT_CREATED` | Thread | A contact (case) was created for the conversation. *(Deprecated alias: `CASE_CREATED`.)* |
| `ChatEvent.CONTACT_STATUS_CHANGED` | Thread | The contact's status changed (e.g. open → closed). *(Deprecated alias: `CASE_STATUS_CHANGED`.)* |
| `ChatEvent.ASSIGNED_AGENT_CHANGED` | Thread | The agent assigned to the contact changed. *(Deprecated alias: `CASE_INBOX_ASSIGNEE_CHANGED`.)* |
| `ChatEvent.CONTACT_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED` | Thread | The contact was (re)assigned to a routing queue. *(Deprecated alias: `CASE_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED`.)* |
| `ChatEvent.CONTACT_RECIPIENTS_CHANGED` | Thread | The recipient set changed (relevant for group chat). |
| `ChatEvent.CONTACT_INBOX_PRE_ASSIGNEE_CHANGED` | SDK | The pre-assignee for the contact inbox changed. |
| `ChatEvent.CONTACT_PREFERRED_USER_CHANGED` | SDK | The contact's preferred user changed. |

### Livechat / queue

| Event | Level | When it fires |
|---|---|---|
| `ChatEvent.SET_POSITION_IN_QUEUE` | SDK | The consumer's position in the livechat queue was (re)calculated. Drive a "you are #N in line" UI. |
| `ChatEvent.LIVECHAT_RECOVERED` | Thread | A livechat session was recovered (after reconnect/resume). |

### Proactive / visitor

| Event | Level | When it fires |
|---|---|---|
| `ChatEvent.FIRE_PROACTIVE` | SDK | The backend instructs the client to evaluate/fire a proactive action (welcome message, pop-up, guide template). The SDK does **not** act on this for you — handle it from your own event routing (typically via `onRawEvent`) and decide whether to trigger the proactive UI. |
| `ChatEvent.PAGE_VIEW_CREATED` | SDK | A visitor page view was recorded. |

### Streamed / GenAI messages

These power token-by-token streaming of generative-AI replies. See [messaging-and-rich-content.md](./messaging-and-rich-content.md) for the full streaming model and how to assemble deltas.

| Event | Level | When it fires |
|---|---|---|
| `ChatEvent.STREAMED_MESSAGE_STARTED` | Thread | A streamed (GenAI) message has begun; expect deltas to follow. |
| `ChatEvent.STREAMED_MESSAGE_DELTA` | Thread | A chunk (delta) of the streamed message arrived; append it to the in-progress message. |
| `ChatEvent.STREAMED_MESSAGE_COMPLETED` | Thread | The streamed message finished; the final content is settled. |
| `ChatEvent.STREAMED_MESSAGE_FAILED` | Thread | The stream failed before completing; fall back / show an error. |

### Thread & data-sync

These are responses to data-fetching/recovery calls and connection sync. Most apps drive these from `onRawEvent` or from the resolved promise of the corresponding method rather than by subscribing directly.

| Event | Level | When it fires |
|---|---|---|
| `ChatEvent.THREAD_RECOVERED` | Thread | A thread's state/history was recovered. |
| `ChatEvent.THREAD_LIST_FETCHED` | SDK | The list of threads requested via `getThreadList()` arrived. |
| `ChatEvent.THREAD_METADATA_LOADED` | Thread | Thread metadata requested for the thread arrived. |
| `ChatEvent.THREAD_ARCHIVED` | Thread | A thread was archived. |
| `ChatEvent.CONSUMER_AUTHORIZED` | SDK | The consumer/customer was authorized on the socket. |
| `ChatEvent.TOKEN_REFRESHED` | SDK | The access token was refreshed (the SDK schedules this automatically). |
| `ChatEvent.OFFLINE_MESSAGE_SENT` | Thread | An offline message was accepted. |
| `ChatEvent.TRANSCRIPT_SENT` | Thread | A transcript-by-email request completed. |

> For connection lifecycle (`OPEN`, `RECONNECTING`, `CLOSE`, `AUTHORIZATION_FAILED`), use `sdk.getWebsocketClient().on(WebSocketClientEvent.*, …)` — those are socket events from `WebSocketClientEvent`, not `ChatEvent` members. See [connection-guidance.md](./connection-guidance.md).

---

## Type-narrowing guards

A `ChatCustomEvent` payload (`event.detail`) carries `data: unknown`. Before reading `event.detail.data`, narrow it with one of the exported `is*Event` guards so TypeScript knows the concrete shape (and so you don't act on a malformed payload). Most guards check the event `type`; some also validate that expected `data` fields are present. Treat `event.detail.data` defensively after narrowing.

The exported guards are:

| Guard | Narrows |
|---|---|
| `isMessageCreatedEvent` | `MESSAGE_CREATED` payloads |
| `isMessageSentEvent` | `MESSAGE_SENT` payloads |
| `isMessageReadChangedEvent` | `MESSAGE_READ_CHANGED` payloads |
| `isAgentTypingStartedEvent` | `AGENT_TYPING_STARTED` payloads |
| `isAgentTypingEndedEvent` | `AGENT_TYPING_ENDED` payloads |
| `isAssignedAgentChangedEvent` | `ASSIGNED_AGENT_CHANGED` payloads |
| `isContactCreatedEvent` | `CONTACT_CREATED` payloads |
| `isContactStatusChangedEvent` | `CONTACT_STATUS_CHANGED` payloads |
| `isContactToRoutingQueueAssignmentChangedEvent` | `CONTACT_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED` payloads |
| `isContactRecipientsChangedEvent` | `CONTACT_RECIPIENTS_CHANGED` payloads |
| `isSetPositionInQueueEvent` | `SET_POSITION_IN_QUEUE` payloads |
| `isStreamedMessageEventData` | Streamed-message (`STREAMED_MESSAGE_*`) payload data — unlike the other guards, call it with `event.detail.data`, not `event.detail` |
| `isMoreMessagesLoadedEvent` | `MORE_MESSAGES_LOADED` payloads |
| `isRecoverSuccessEvent` | Thread-recovery success payloads |
| `isAuthSuccessEvent` | Authorization-success payloads |
| `isTokenRefreshedSuccessResponse` | `TOKEN_REFRESHED` success payloads |
| `isThreadArchivedSuccessPayload` | `THREAD_ARCHIVED` success payloads |
| `isThreadListFetchedPostbackData` | `THREAD_LIST_FETCHED` payloads |
| `isLoadMetadataSuccessPayload` | `THREAD_METADATA_LOADED` success payloads |

Canonical pattern — guard, then read `data`:

```ts
import {
  ChatEvent,
  isMessageCreatedEvent,
} from '@nice-devone/nice-cxone-chat-web-sdk';

thread.onThreadEvent(ChatEvent.MESSAGE_CREATED, (event) => {
  // event.detail.data is `unknown` here
  if (!isMessageCreatedEvent(event.detail)) {
    return; // unexpected shape — skip
  }
  // narrowed: safe to read the message
  renderMessage(event.detail.data.message);
});
```

```ts
sdk.onChatEvent(ChatEvent.SET_POSITION_IN_QUEUE, (event) => {
  if (isSetPositionInQueueEvent(event.detail)) {
    showQueuePosition(event.detail.data);
  }
});
```

---

## Error handling

Pass an `onError` callback (type `ErrorCallback = (error: Error) => void`) in the SDK options. It is the single sink for asynchronous failures the SDK surfaces.

```ts
const sdk = new ChatSdk({
  brandId, channelId, environment,
  onError: (error) => handleSdkError(error),
});
```

**If you do not provide `onError`, errors are not swallowed** — socket errors are thrown, and failures inside async work surface as rejected promises / unhandled rejections. Always install `onError`.

### The error hierarchy

The base class is **`ChatSDKError`** (extends `Error`). It normalizes arbitrary thrown values, preserves the original error in `cause`, and exposes a `data` field and an `additionalInfo` field. Anything the SDK reports through `onError` that isn't already a `ChatSDKError` is wrapped in one.

The exported guard **`isChatSDKError(error)`** returns true only when `error instanceof ChatSDKError` **and** `error.data !== undefined`.

> ⚠️ **Gotcha:** a *bare* `ChatSDKError` constructed without `data` will **not** pass `isChatSDKError` — the guard requires `data` to be defined. Use it to detect SDK errors that carry structured `data`; for a plain instance check, use `error instanceof ChatSDKError`.

The distinct error types, when they fire, and their base class:

| Error | Extends | When it fires |
|---|---|---|
| `ChatSDKError` | `Error` | Base type. Also used directly for generic SDK failures (invalid URL, disconnected socket on `getThread`, etc.). |
| `AuthorizationError` | `ChatSDKError` | Authorization or token refresh failed. Its `data` may be `undefined`, so it will not always match `isChatSDKError`. |
| `WebSocketConnectionError` | `Error` | The socket closed and the heartbeat had already declared the connection dead ("HeartBeat died") — i.e. a genuine connection loss after retries. Show a hard-offline state. |
| `WebSocketClientError` | `Error` | A transient WebSocket error or close (connection error, connection closed, or an unknown socket error) that is *not* a dead-heartbeat disconnect. Usually paired with the SDK's reconnect logic. |
| `IpAddressBlockedError` | `Error` | The consumer's IP address is blocked. **Its `name` is `'ipAddressBlocked'`** (not the class name) — branch on `name`. |
| `SdkVersionNotSupported` | `Error` | The backend rejected the SDK version. `name` is `'SdkVersionNotSupported'`; message asks the user to update. Prompt an app update. |
| `UploadAttachmentError` | `ChatSDKError` | An attachment upload failed; `data.response` holds the failure response. |
| `AbortError` | `ChatSDKError` | An abortable operation (e.g. a data-recovery call) was cancelled. `name` is `'AbortError'`. |
| `CacheStorageError` | `Error` | The SDK's cache storage layer failed. |
| `ThreadRecoverFailedError` | `ChatSDKError` | `thread.recover()` failed. |
| `LoadMoreMessagesFailedError` | `ChatSDKError` | Loading older messages failed. |
| `GetMetadataFailedError` | `ChatSDKError` | Loading thread metadata failed. |
| `ArchiveThreadFailedError` | `ChatSDKError` | Archiving a thread failed. |
| `SetThreadNameFailedError` | `ChatSDKError` | Renaming a thread failed. |
| `SendMessageFailedError` | `ChatSDKError` | Sending a message / outbound / offline message failed (also thrown for empty content). |
| `CreateInvitationFailedError` | `ChatSDKError` | Creating a group-chat invitation failed. |
| `JoinGroupChatFailedError` | `ChatSDKError` | Joining a group chat failed. |
| `SendEmailInvitationFailedError` | `ChatSDKError` | Sending a group-chat email invitation failed. |

The `*FailedError` classes are **thrown (rejected)** from their corresponding async thread/message/group-chat methods — `try/catch` around those calls. Socket-level errors (`WebSocketConnectionError`, `WebSocketClientError`, `IpAddressBlockedError`) and authorization/connection failures arrive through your `onError` callback.

### Branching `onError` by type

`IpAddressBlockedError` and `SdkVersionNotSupported` set a custom `name` rather than relying on the class name, so branch on `name` for those and on `instanceof` for the rest:

```ts
import {
  ChatSDKError,
  WebSocketConnectionError,
  WebSocketClientError,
  AuthorizationError,
} from '@nice-devone/nice-cxone-chat-web-sdk';

function handleSdkError(error: Error): void {
  // name-based first — these extend plain Error with a custom `name`
  if (error.name === 'ipAddressBlocked') {
    showBlockedScreen();        // IpAddressBlockedError
    return;
  }
  if (error.name === 'SdkVersionNotSupported') {
    promptAppUpdate();          // SdkVersionNotSupported
    return;
  }

  if (error instanceof WebSocketConnectionError) {
    showHardOffline();          // dead connection — retries exhausted / heartbeat died
    return;
  }
  if (error instanceof WebSocketClientError) {
    showReconnectingHint();     // transient socket blip
    return;
  }
  if (error instanceof AuthorizationError) {
    refreshAuthAndReconnect();  // re-fetch auth code, reset the session
    return;
  }
  if (error instanceof ChatSDKError) {
    log(error.message, error.cause, error.data);
    return;
  }

  log('Unexpected error', error);
}
```

See [connection-guidance.md](./connection-guidance.md) for the connection events (`OPEN` / `RECONNECTING` / `CLOSE` / `AUTHORIZATION_FAILED`) that complement these socket errors.

---

## Teardown / cleanup

| Concern | Do this |
|---|---|
| Stop the local "consumer is typing" timer before navigating away or closing the composer | `thread.stopTyping()` |
| Switch user / log out / start a fresh session | `await sdk.resetSession(...)` |
| Detect that the page is unloading (so you can suppress reconnect noise) | `registerWindowUnload()` + `isWindowClosing()` |
| Drop event listeners | Call the `RemoveListenerFunction` returned by each `onChatEvent` / `onThreadEvent` |

**`thread.stopTyping()`** clears the pending typing timer and, **if** a typing timer is currently active (i.e. `keystroke()` was called and hasn't yet timed out), sends the "stopped typing" signal. It's a safe no-op otherwise, so call it on blur/unmount/navigation so the agent doesn't see a stale "typing…" indicator.

**`sdk.resetSession(customerId?, customerName?, customerImage?, visitorId?, visitId?)`** tears down and rebuilds the session: it disconnects the WebSocket, clears the thread cache and queued contact custom fields, resets the stored access/third-party/transaction tokens, destroys the current customer, then reconnects with a **new** customer (generating fresh ids for any argument you omit). Use it for logout or "switch to a different user". Any failure during the reconnect is routed to your `onError` callback.

**`registerWindowUnload()`** installs a one-shot `beforeunload` listener; afterwards **`isWindowClosing()`** returns `true`. Use this to tell a genuine page unload apart from a transient drop — e.g. to avoid showing a "reconnecting" banner or firing recovery logic while the tab is closing.

```ts
import { registerWindowUnload, isWindowClosing } from '@nice-devone/nice-cxone-chat-web-sdk';

registerWindowUnload();

// later, inside a close/error handler:
if (isWindowClosing()) {
  return; // page is going away — don't try to reconnect
}
```

---

## Next steps

- [connection-guidance.md](./connection-guidance.md) — connection lifecycle, reconnect, and the socket events that complement the errors above.
- [messaging-and-rich-content.md](./messaging-and-rich-content.md) — sending messages, rich content, and the streamed-message (GenAI) flow.
- [authentication.md](./authentication.md) — Secured Session vs. legacy authorization.
- [getting-started.md](./getting-started.md) — install, instantiate, and connect.
