# Chat Web SDK — Connection, Reconnect & Authorization Guidance

How to drive the SDK's WebSocket lifecycle from your own application: when to connect, what the SDK does on its own, and what *you* must do to keep your UI in sync — especially across reconnects. The patterns here are the ones the reference chat widget relies on in production.

---

## How the SDK manages the connection

**The SDK owns the WebSocket.** You never open, hold, ping, or reconnect a socket yourself. Internally the SDK runs a managed connection that provides:

- **Automatic reconnect** with up to **20 retries** after the first successful `OPEN`.
- A **heartbeat (ping/pong)** that detects dead connections and triggers the reconnect cycle.
- **Automatic token refresh** scheduled at **90% of the access token's lifetime** (legacy auth flow).
- Delivery of **future push events** (new messages, agent typing, assignment changes, …) for as long as the socket is up.

Your job is to call `connect()` **once**, register listeners, and react to events. Everything else is the SDK's responsibility.

---

## The connection contract — three calls and four events

### Three SDK calls

| Call | When | Notes |
|---|---|---|
| `sdk.connect(authCode?)` | Once, at app start (or the first time chat is opened) | Returns `false` if a connection already exists — does **not** create a second socket. |
| `sdk.authorize(authCode, visitorId?, fingerprint?)` | From the `OPEN` handler, **only in the legacy (non-Secured-Session) flow** | Internally tries a token-based reconnect with the stored access token first, then falls back to a fresh registration. With Secured Session you skip this step entirely. |
| `sdk.getWebsocketClient().on(event, handler)` | Immediately after `connect()` resolves | This is how you observe connection state. Returns `null` before the first `connect()`. |

### Four events to listen to (`WebSocketClientEvent`)

| Event | Meaning | Recommended app action |
|---|---|---|
| `OPEN` | Socket is up (fires on the **initial** connect **and on every reconnect**). | If using legacy auth, call `sdk.authorize(...)`. Then **re-sync session state** (see *Recovering session state*). |
| `RECONNECTING` | SDK is mid-retry after a drop (emitted while `retryCount` is between 1 and 19 — up to but not including the 20-retry maximum). | Show "reconnecting" UI. **Do nothing else** — don't call `connect()`, don't open sockets. |
| `CLOSE` | Socket closed for good — retries exhausted, or a final disconnect. | Show offline UI. Optionally call `sdk.getWebsocketClient().reconnect()` to start a fresh attempt cycle. |
| `AUTHORIZATION_FAILED` | Socket closed **before** `OPEN` ever fired → almost certainly an auth problem (the auth code was rejected). | Re-fetch your auth code from your backend and restart the connection flow, or call `sdk.resetSession(...)`. |

> The SDK separates `RECONNECTING` from `CLOSE` deliberately: while it is actively retrying, only `RECONNECTING` fires, so your UI can show a transient "reconnecting" state. `CLOSE` is only forwarded once retries are exhausted, signalling a genuine offline/error state. Don't treat every drop as a `CLOSE`.

---

## Ping/pong & heartbeat — the SDK keeps the socket alive for you

A TCP/WebSocket connection can silently "die" — the tab is backgrounded, a proxy drops it, the network flaps — without the browser ever firing a `close` event. To catch this, the SDK runs a **heartbeat** over the socket:

- It periodically sends a lightweight ping and expects a pong back. As long as pongs arrive, the connection is considered healthy.
- If a pong does not arrive within the expected window, the SDK marks the connection as dying and then dead, and **automatically starts the reconnect cycle** — which surfaces to your app as `RECONNECTING`, then either a recovered `OPEN` or, after retries are exhausted, `CLOSE`.

What this means for your application:

- **You do not implement ping/pong.** The protocol-level keep-alive is entirely internal.
- **You do not implement your own reconnect.** Detecting a dead socket and retrying is exactly what the heartbeat + retry loop already does.
- **You only observe.** The heartbeat is not directly exposed as an app event — you experience its results through the four `WebSocketClientEvent`s above. A heartbeat-detected death looks identical to any other reconnect from the app's point of view: `RECONNECTING` → `OPEN` (re-sync!) or `CLOSE`.

The single most common integration bug is an app that adds its own `setInterval` ping or its own `online`/`offline`/`visibilitychange` reconnect on top of this. That fights the SDK's heartbeat and retry loop. **Don't.** (See *Anti-patterns*.)

---

## What the SDK handles on its own vs what the app must do

| The SDK handles | Your application handles |
|---|---|
| Opening and holding the **authenticated** WebSocket to the chat gateway | Calling `sdk.connect(authCode?)` **once** per page lifetime |
| **Heartbeat / ping-pong** keep-alive to detect dead sockets | Attaching listeners via `sdk.getWebsocketClient().on(...)` immediately after connect |
| **Automatic reconnect** (up to **20 retries** after the first `OPEN`) | Driving UI from connection events (`OPEN` / `RECONNECTING` / `CLOSE` / `AUTHORIZATION_FAILED`) — never from an internal flag |
| **Automatic token refresh** at ~90% of the access token's lifetime (legacy flow) | (Legacy flow only) calling `sdk.authorize(...)` from the `OPEN` handler |
| Delivering **future push events** while the socket is up | **Re-syncing session state on every `OPEN`** — recover the open thread, re-fetch the thread list (see below) |
| Transparently fetching **large / streamed payloads** (e.g. long message histories, chunked content) so you receive complete data | Handling `AUTHORIZATION_FAILED` distinctly from a transient drop |

The dividing line: the SDK guarantees a *live, authenticated transport* and the delivery of *events that happen from now on*. It does **not** know what your UI currently shows, and it does **not** replay what you missed while disconnected. Bridging that gap is the app's job — which is what the next section is about.

---

## Recovering session state: after connect vs after reconnect

This is the part integrators most often get wrong. **Recovery is your responsibility, and you must do it again on every reconnect.**

### After the initial connect (`OPEN`)

When the socket first opens, the SDK has a live transport but your UI has no conversation in it yet. Load the existing conversation so the customer sees prior messages, contact state, and history:

```ts
ws.on(WebSocketClientEvent.OPEN, async () => {
  // (legacy auth only) await sdk.authorize(authCode, visitorId, fingerprint);

  // Load the existing thread's full state into the SDK + your UI:
  await sdk.recoverThreadData(threadId);          // messaging channel
  // or, on a livechat channel:
  // await sdk.recoverLivechatThreadData(threadId);
});
```

Recovery pulls down the thread's **messages, contact, scroll/history token, and customer data**, and — when called via the `sdk.*` methods — creates the in-SDK `Thread` instance and emits a thread-recovered chat event your UI can subscribe to.

### After a reconnect (every *subsequent* `OPEN`)

`OPEN` fires again every time the SDK reconnects. **You must re-run recovery on each `OPEN`, not just the first one.** This is non-negotiable, because:

> The SDK guarantees delivery of **future** events only. It does **not** replay events that occurred while the socket was down. Any messages, agent replies, typing changes, or assignment updates that happened during the outage are **not** re-sent on reconnect.

If you recover only once (on the initial connect) and then rely on push events, the customer will silently miss everything an agent sent during a network blip. Re-syncing on every `OPEN` closes that gap by fetching the authoritative current state.

```ts
// Correct: one handler, runs on initial connect AND every reconnect.
ws.on(WebSocketClientEvent.OPEN, async () => {
  // (legacy auth only) await sdk.authorize(...);

  // For multi-thread (messaging) UIs, refresh the inbox first:
  if (isMessagingChannel) {
    const threads = await sdk.getThreadList();   // overview/metadata only
    renderInbox(threads);
  }

  // Then re-sync the currently open thread's full state:
  await recoverOpenThread();   // wraps sdk.recoverThreadData / recoverLivechatThreadData
});
```

```ts
// Anti-pattern: recovering once and assuming reconnects auto-catch-up.
let recoveredOnce = false;
ws.on(WebSocketClientEvent.OPEN, async () => {
  if (recoveredOnce) return;          // ❌ misses everything sent during outages
  recoveredOnce = true;
  await sdk.recoverThreadData(threadId);
});
```

### `thread.recover()` vs `sdk.recoverThreadData()` — which to call

Both hit the same underlying recover operation and return the same thread data, but they differ in side effects:

| Method | Returns | Side effects | Use it when |
|---|---|---|---|
| `sdk.recoverThreadData(threadId?)` / `sdk.recoverLivechatThreadData(threadId?)` | The recovered thread data (abortable promise) | **Creates the in-SDK `Thread` instance** and **emits a thread-recovered chat event** so your event-driven UI updates automatically | Driving your UI from SDK events — **this is the recommended path** for (re)opening/restoring a thread |
| `thread.recover()` | The same recovered thread data (abortable promise) | **None** — it only resolves the data; it does **not** emit a recovered event or (re)register the thread instance | You already hold a `Thread` and just want its current data in-hand, outside the event flow |

**Recommendation:** use the `sdk.recover*ThreadData()` methods for connect/reconnect re-sync. They keep the SDK's thread cache and your event listeners in step, which is exactly what you want when an `OPEN` should refresh the UI. The reference widget uses these (`recoverLivechatThreadData` for livechat, `recoverThreadData` otherwise) on every connect and reconnect. Reach for `thread.recover()` only for a targeted, side-effect-free data pull.

Both recover calls return an **abortable promise** — abort any in-flight recovery before starting a new one (a fast reconnect can otherwise overlap two recoveries; see *Anti-patterns*).

---

## `FetchThreadList` vs `Recover` — they answer different questions

These two operations are easy to confuse, but they do very different things:

| | `sdk.getThreadList()` *(FetchThreadList)* | `sdk.recoverThreadData()` / `recoverLivechatThreadData()` / `thread.recover()` *(Recover)* |
|---|---|---|
| **Scope** | **All** of the customer's threads on the channel | **One** specific thread |
| **Returns** | A list of thread **overviews/metadata** — thread id, name, and basic flags | That thread's **full state**: messages, contact, scroll/history token, customer data |
| **Loads message bodies?** | **No** — no message content, no history | **Yes** — the conversation's messages and history |
| **Typical use** | Render an **inbox / thread switcher** | **Open or restore** a specific conversation |
| **Channel relevance** | Multi-thread **messaging** channels (a customer can have several threads) | Both — but a **livechat** (single-session) channel only ever has one thread to recover |

Decision guide:

- **Building a list of conversations?** Use `getThreadList()`. It's cheap (metadata only) and tells you which threads exist and what to label them. To show a per-thread preview (e.g. last message), load each thread's metadata/state separately — `getThreadList()` alone won't give you message bodies.
- **Opening or restoring one conversation?** Use `recover()`. That's what actually loads the messages and contact so the chat view is populated.
- **Livechat channel?** There's a single session, so a thread switcher is usually irrelevant — you go straight to `recoverLivechatThreadData()`. `getThreadList()` matters for **messaging** channels where multiple threads coexist.

A common multi-thread flow on `OPEN` is therefore: `getThreadList()` to refresh the switcher, then `recoverThreadData()` on whichever thread is currently open.

---

## Authorization model

- **Prefer Secured Session** (`ChatSDKOptions.securedSession`). The legacy `sdk.authorize()` is marked `@deprecated`. With Secured Session, the chat gateway authenticates the socket directly — your app never has to handle a token, and you skip `authorize()` entirely.
- If you're on the legacy flow: the access token is stored by the SDK and refreshed automatically at ~90% of its lifetime. **Do not implement your own refresh timer** — you'll race with the SDK's scheduled refresh.
- On reconnect, the SDK reuses the stored token automatically. You don't re-pass the auth code unless that fails and you observe `AUTHORIZATION_FAILED`.
- The auth code itself is short-lived. Fetch it from your backend at the moment you call `connect()` — don't cache it.

For the full authentication picture (Secured Session setup, token lifecycle, identity), see **[authentication.md](./authentication.md)**.

---

## Recommended integration pattern

```ts
import { ChatSdk, WebSocketClientEvent } from '@nice-devone/nice-cxone-chat-web-sdk';

const sdk = new ChatSdk({
  brandId, channelId, environment,
  securedSession: /* SecureSessions.XY */,         // preferred; prior FT enablement and channel settings required
  onError: (e) => log(e),
  onRawEvent: (e) => /* route events */,
});

const created = await sdk.connect(authCode);
if (!created) {
  // Already connected — this is fine, just (re)attach listeners.
}

const ws = sdk.getWebsocketClient();

ws.on(WebSocketClientEvent.OPEN, async () => {
  // Legacy auth only — skip with Secured Session:
  // await sdk.authorize(authCode, visitorId, fingerprint);

  // Re-sync UI state on EVERY open (initial connect AND reconnects).
  // The SDK delivers future events only — it does not replay missed ones.
  if (isMessagingChannel) {
    renderInbox(await sdk.getThreadList());        // overview/metadata
  }
  await recoverOpenThread();                       // sdk.recover[Livechat]ThreadData(threadId)
});

ws.on(WebSocketClientEvent.RECONNECTING, () => showReconnectingBanner());
ws.on(WebSocketClientEvent.CLOSE, () => showOfflineBanner());
ws.on(WebSocketClientEvent.AUTHORIZATION_FAILED, async () => {
  const fresh = await fetchAuthCodeFromBackend();
  /* restart the whole connection flow with the fresh code */
});
```

**Key invariant:** treat every `OPEN` as "I just (re)connected — re-fetch whatever I need to display." The SDK guarantees delivery of *future* events, not catch-up on missed ones.

---

## Anti-patterns

1. **Opening your own WebSocket alongside the SDK.** The SDK already holds an authenticated socket to the chat gateway; a parallel socket would not be authorized, would not get push updates, and would compete with the SDK's heartbeat/retry. **Action: remove the custom socket entirely.**
2. **Implementing your own ping/pong.** The SDK's heartbeat already keeps the socket alive and detects death. A second keep-alive only adds noise and can confuse the gateway. **Action: delete it.**
3. **Calling `connect()` on every focus / route change / network event.** It's a no-op after the first call (returns `false`) but it signals a misunderstanding — the SDK connection is long-lived. Call it once per page lifetime.
4. **Manually refreshing the access token.** The SDK schedules its own refresh at 90% of lifetime. Manual refresh races with it and can leave the socket with a token the backend already rotated.
5. **Calling `disconnect()` + `connect()` on every `online`/`offline`/`visibilitychange`.** The heartbeat already detects dead sockets and the retry loop reconnects. App-driven reconnects fight the SDK. The reference widget listens to `visibilitychange` only for proactive-chat triggering — never for connection management.
6. **Treating `authorize()` success as "I'm connected".** `authorize()` only runs *after* `OPEN`. If the socket dies after auth, you are no longer connected — drive UI state from socket events, not from the `authorize()` promise.
7. **Recovering only once.** Recovering on the initial `OPEN` and then assuming reconnects auto-catch-up means the customer silently misses everything sent during an outage. **Re-run recovery on every `OPEN`.**
8. **Confusing `getThreadList()` with `recover()`.** `getThreadList()` returns metadata only — using it to "open" a thread leaves the chat view empty because it carries no messages. Use `recover()` to load a conversation.
9. **Not listening to `CLOSE` / `RECONNECTING`.** Without these, the app's UI desyncs from real connection state during outages.
10. **Skipping `AUTHORIZATION_FAILED` handling.** This is the only signal that the auth code itself was rejected — distinct from a transient socket drop. If unhandled, users hit a silent dead socket whenever a token is rejected.
11. **Firing parallel session-recovery calls.** Recovery returns an abortable promise; a fast reconnect can start a second recovery while the first is in flight. **Abort the prior recovery before starting a new one on reconnect.**

---

## Related guides

- **[getting-started.md](./getting-started.md)** — install, initialize, open a thread, send and receive your first messages.
- **[authentication.md](./authentication.md)** — Secured Session vs legacy auth, token lifecycle, and identity in depth.
- **[events-and-errors.md](./events-and-errors.md)** — the full catalog of push events and SDK error types, and how to handle them.
- **[threads-and-livechat.md](./threads-and-livechat.md)** — the full thread lifecycle: messaging vs livechat, starting/ending chats, archiving, and thread state.
