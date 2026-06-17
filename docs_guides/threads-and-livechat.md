# Threads, Livechat & the Contact Lifecycle

How conversations actually work in the Chat Web SDK: the two channel modes (multi-thread *messaging* vs single-session *livechat*), the methods that drive each one, and the **contact** (case) lifecycle that runs underneath every conversation — statuses, routing, agent assignment, typing, and custom fields.

This guide assumes you have already initialized and connected the SDK. If you haven't, start with **[getting-started.md](./getting-started.md)**, and see **[connection-guidance.md](./connection-guidance.md)** for the connect/reconnect lifecycle.

All examples import from the public package:

```ts
import { ChatSdk, LivechatThread, ChatEvent, splitName } from '@nice-devone/nice-cxone-chat-web-sdk';
```

---

## Two channel modes: `Thread` vs `LivechatThread`

A channel is configured on the CXone side as either **messaging** or **livechat**, and that choice changes how conversations behave:

- **Messaging (multi-thread).** Asynchronous. A customer can hold several long-lived conversations at once, leave, and come back days later. Think of an inbox of threads.
- **Livechat (single-session).** Synchronous. There is one active session that the customer explicitly **starts** and **ends**, and they may wait in a **queue** before an agent picks them up.

`sdk.getThread(id)` returns the right object for the channel automatically:

- On a **messaging** channel it returns a **`Thread`**.
- On a **livechat** channel it returns a **`LivechatThread`** (which *extends* `Thread`, so everything a `Thread` can do, a `LivechatThread` can do too — plus `startChat()` / `endChat()`).

### Knowing which mode you're in

You have two reliable signals:

1. **The `isLivechat` SDK option.** If you already know the channel type, pass `isLivechat: true` when constructing the SDK. The SDK reads it back as `sdk.isLivechat` and uses it to decide which class `getThread()` instantiates.
2. **The channel info.** Call `sdk.getChannelInfo()` and read `isLiveChat` — useful when you don't want to hard-code the mode and would rather discover it at runtime.

If you hold a thread instance, you can also test it directly with `instanceof`:

```ts
const thread = sdk.getThread(threadId);

if (thread instanceof LivechatThread) {
  // single-session: startChat / endChat / queue apply
} else {
  // messaging: thread list, naming, archiving apply
}
```

### Capability comparison

| Capability | Messaging (`Thread`) | Livechat (`LivechatThread`) |
|---|---|---|
| `sendTextMessage()` / `sendMessage()` / `sendAttachments()` | Yes | Yes |
| Receive push events (messages, typing, assignment) | Yes | Yes |
| `recover()` / `sdk.recoverThreadData()` | Yes | Use `recoverLivechatThreadData()` |
| `getThreadList()` (inbox of threads) | Yes — a customer may have many threads | Not meaningful — one session only |
| `getMetadata()` (last-message preview) | Yes | Inherited, but rarely needed (single session) |
| `setName()` (rename the conversation) | Yes | Inherited, but not a typical livechat action |
| `archive()` | Yes | Inherited, but livechat sessions are *ended*, not archived |
| `startChat(initialText?)` | n/a | Yes — opens the session |
| `endChat()` | n/a | Yes — closes the session |
| Queue position (`SetPositionInQueue`) | n/a | Yes — while waiting for an agent |
| Custom fields, typing, contact lifecycle | Yes | Yes |

> `setName()`, `archive()`, and `getThreadList()` exist for technical reasons on both classes (livechat inherits them), but on a livechat channel they are effectively no-ops in product terms — there's a single session to manage, not an inbox. Treat them as messaging-only.

---

## Messaging (multi-thread) lifecycle

On a messaging channel the customer can have several threads. A typical flow:

```ts
// 1. List the customer's existing threads (overview/metadata only — no message bodies).
const threads = await sdk.getThreadList();   // Array<ThreadView> | null

// 2. Get a handle to one thread (existing id, or a fresh generated id for a new thread).
const thread = sdk.getThread(threadId);

// 3. Load that thread's full state (messages, contact, history, customer).
await thread.recover();
//    …or, to also create the in-SDK instance and emit a recovered event:
// await sdk.recoverThreadData(threadId);

// 4. Send a message.
await thread.sendTextMessage('Hello!');
```

Key methods:

| Method | What it does |
|---|---|
| `sdk.getThreadList()` | Returns an array of **thread overviews** (id, name, basic flags) — your inbox/switcher. **No message bodies.** Returns `null` if there are none. |
| `sdk.getThread(id)` | Returns (and caches) a `Thread` for the given id. The id can be an existing thread or a new client-generated id for a brand-new conversation. |
| `thread.recover()` | Loads the thread's **full state** — messages, contact, scroll/history token, customer. Returns an abortable promise. Does **not** emit an event (see *recover() vs recoverThreadData()* below). |
| `thread.sendTextMessage(text, options?)` | Sends a text message. (See **[messaging-and-rich-content.md](./messaging-and-rich-content.md)** for attachments, postbacks, and rich content.) |
| `thread.getMetadata()` | Returns thread metadata including the **last message** — handy for rendering a per-thread preview in the inbox without loading the whole conversation. |
| `thread.setName(name)` | Renames the thread. Resolves `true` on success, throws `SetThreadNameFailedError` otherwise. |
| `thread.archive()` | Archives the thread (removes it from the active inbox). Resolves `true` on success, throws `ArchiveThreadFailedError` otherwise. |

To show a list of conversations *with* a last-message preview, combine the two: call `getThreadList()` for the set of threads, then `getMetadata()` per thread for its preview. `getThreadList()` alone returns no message content.

> On a **livechat** channel these multi-thread methods are irrelevant: there is one session, so there is nothing to list, rename, or archive. Use the livechat lifecycle below instead.

---

## Livechat (single-session) lifecycle

A livechat session is explicitly started, may wait in a queue, and is explicitly ended.

```ts
const thread = sdk.getThread(threadId);   // a LivechatThread on a livechat channel

// Start the session. The (optional) text becomes the first message.
await thread.startChat('Hi, I need help with my order');

// …conversation happens, agent gets assigned, messages flow…

// End the session when done.
await thread.endChat();
```

### `startChat(initialMessageText?)`

`startChat()` opens the session by sending an initial message (default text: `'Begin conversation'`). It can be called **once** — calling it again on an already-started session **throws** `ChatSDKError('Chat is already initialized')`. (The guard takes effect once the first call resolves, so don't fire a second `startChat()` while the first is still in flight.) If sending that first message fails, it throws a `ChatSDKError` describing the underlying cause. Guard accordingly:

```ts
try {
  await thread.startChat(firstMessage);
} catch (error) {
  // already started, or the initial send failed
}
```

### Waiting in queue — `SET_POSITION_IN_QUEUE`

After a session starts, the customer may be placed in a routing queue before an agent is available. Subscribe to **`ChatEvent.SET_POSITION_IN_QUEUE`** to track their place in line and update your "you are number N in line" UI:

```ts
sdk.onChatEvent(ChatEvent.SET_POSITION_IN_QUEUE, (event) => {
  const { positionInQueue, routingQueue, isAnyAgentOnlineForQueue } = event.detail.data;
  showQueuePosition(positionInQueue);
});
```

The payload carries the current `positionInQueue`, the `routingQueue`, and `isAnyAgentOnlineForQueue`. The position generally only moves forward (toward the front); once the customer is assigned, queue updates stop and the agent-assignment events take over.

### `endChat()` — and the contact gotcha

**`endChat()` depends on a contact existing.** Internally it reads the `contactId` from the recovered/created session data; if there is none, it throws:

```
ChatSDKError('Cannot end Chat because of missing ContactId in the storage')
```

A contact id becomes available once **`ContactCreated`** has fired (after the first message creates the contact) or after a successful **recover**. So:

- **Don't** call `endChat()` immediately after `startChat()` resolves — the contact may not exist yet.
- **Do** wait until you've seen `ChatEvent.CONTACT_CREATED` (or have recovered an existing session) before enabling your "End chat" control.

```ts
let canEndChat = false;

sdk.onChatEvent(ChatEvent.CONTACT_CREATED, () => {
  canEndChat = true;            // safe to call endChat() now
});

async function onEndChatClicked() {
  if (!canEndChat) return;      // contact not created yet
  await thread.endChat();
}
```

Note also that after a livechat contact is closed the SDK blocks further sends — `sendMessage()` on the `LivechatThread` throws `ChatSDKError('Cannot send more messages to Contact')`.

### Recovering a livechat session

Use **`sdk.recoverLivechatThreadData(threadId?)`** to restore an existing livechat session on connect/reconnect. It loads the session's messages, contact, and customer, creates the in-SDK `LivechatThread`, and emits a recovered event your UI can react to. Because livechat is single-session, there is no thread list to refresh first — you go straight to recovery.

---

## `recover()` vs `recoverThreadData()`, and `FetchThreadList` vs `Recover`

These are covered in depth in **[connection-guidance.md](./connection-guidance.md)**; in short:

- **`sdk.recoverThreadData(id?)` / `sdk.recoverLivechatThreadData(id?)`** load one thread's full state, **create the in-SDK thread instance, and emit a recovered chat event** — the recommended path for (re)opening a conversation in an event-driven UI.
- **`thread.recover()`** returns the same data but has **no side effects** (no event, no instance registration) — for a targeted, side-effect-free data pull when you already hold the thread.
- **`getThreadList()` (FetchThreadList)** returns *all* the customer's threads as metadata only (no message bodies) — for an inbox. **Recover** loads *one* thread's full state — to open or restore it.

All `recover*` calls return an **abortable promise**; abort an in-flight recovery before starting another (e.g. on a fast reconnect).

---

## Contact (case) lifecycle

A **contact** (historically called a **case**) is a single routed interaction created from a thread — the unit an agent actually picks up and works. One thread can produce several contacts over time (for example, a new contact each time the customer re-engages after the previous one closed).

### Contact statuses

A contact moves through these statuses (the `ContactStatus` enum, string values as delivered in events):

| Status | Value | Meaning |
|---|---|---|
| `NEW` | `"new"` | Contact created, not yet opened/worked. |
| `OPEN` | `"open"` | Actively being handled. |
| `PENDING` | `"pending"` | Waiting (e.g. on the customer or a follow-up). |
| `ESCALATED` | `"escalated"` | Escalated for additional handling. |
| `RESOLVED` | `"resolved"` | Marked resolved. |
| `CLOSED` | `"closed"` | Closed — the interaction is finished. |
| `TRASHED` | `"trashed"` | Discarded. |

### Contact events

Subscribe with `sdk.onChatEvent(...)` (or `thread.onThreadEvent(...)` to scope to one thread):

| Event (`ChatEvent.*`) | String type | Fires when |
|---|---|---|
| `CONTACT_CREATED` | `"CaseCreated"` | A contact is created from the thread (after the first message). This is your signal that the contact now exists on the platform. |
| `CONTACT_STATUS_CHANGED` | `"CaseStatusChanged"` | The contact's status changes (see table above). |
| `CONTACT_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED` | `"CaseToRoutingQueueAssignmentChanged"` | The contact is (re)assigned to a different routing queue. |

> **On `closed`, the SDK clears the thread's custom fields.** When a `CONTACT_STATUS_CHANGED` event reports status `closed`, the SDK wipes the thread's in-memory custom fields and marks the contact as no longer existing — so custom fields from a finished contact don't leak into the next one. If you need fields to persist into a new contact, set them again after a new contact starts.

> **Deprecated `CASE_*` aliases.** Older `ChatEvent` names — `CASE_CREATED`, `CASE_STATUS_CHANGED`, `CASE_INBOX_ASSIGNEE_CHANGED`, `CASE_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED` — still exist and map to the same underlying string types, but they are **deprecated**. Use the `CONTACT_*` / `ASSIGNED_AGENT_CHANGED` names in new code.

---

## Agent assignment & typing

### Agent assignment — `ASSIGNED_AGENT_CHANGED`

When an agent is assigned to (or unassigned from) the contact, the platform pushes **`ASSIGNED_AGENT_CHANGED`** (string type `"CaseInboxAssigneeChanged"`; the deprecated alias is `CASE_INBOX_ASSIGNEE_CHANGED`). Read the new agent from `data.inboxAssignee`, which is a `User` (or `null` when unassigned). `previousInboxAssignee` is also provided.

A `User` exposes `firstName` and `surname`. Build a display name from those:

```ts
sdk.onChatEvent(ChatEvent.ASSIGNED_AGENT_CHANGED, (event) => {
  const agent = event.detail.data.inboxAssignee;   // User | null
  if (agent === null) {
    showAgent(null);                                // unassigned
    return;
  }
  const displayName = `${agent.firstName} ${agent.surname}`.trim();
  showAgent(displayName);
});
```

> If the channel has **"Hide personal information"** enabled, `User` arrives without sensitive fields (email, login, etc.), but `firstName` and `surname` are still present, so the display-name logic above keeps working.

The SDK also exports a small helper, **`splitName`**, which does the inverse — splitting a full-name string into `[firstName, lastName]`:

```ts
import { splitName } from '@nice-devone/nice-cxone-chat-web-sdk';

const [firstName, lastName] = splitName('Ada Lovelace');   // ['Ada', 'Lovelace']
```

> There is **no `parseAgentName` export** in the SDK. To turn an agent `User` into a display name, concatenate `firstName` + `surname` as shown above; use `splitName` only when you need to split a single name string back into parts.

### Typing indicators — `keystroke()` and `stopTyping()`

To tell the agent the customer is typing:

- **`thread.keystroke(timeout = 1000, onSendCallback?)`** — call on each keystroke. It sends a *start typing* event on the first call and (re)arms a timer; after `timeout` ms of no further keystrokes it automatically sends *stop typing*. Repeated calls reset the timer.
- **`thread.stopTyping()`** — cancels the active typing timer and sends *stop typing* if one is in progress (a no-op if no `keystroke()` timer is currently active). Safe to call on blur, unmount, or after sending.

```ts
input.addEventListener('input', () => thread.keystroke());
input.addEventListener('blur', () => thread.stopTyping());
```

> **`keystroke()` no-ops until the contact exists.** It returns early (sends nothing) while the contact has not yet been created on the platform — i.e. before `CONTACT_CREATED` (or a recover) has marked the thread as existing. There's no agent to notify before the contact exists, so this is expected; once the contact is created, `keystroke()` begins emitting typing events.

The agent's own typing surfaces to you as the `AgentTypingStarted` / `AgentTypingEnded` events — see **[events-and-errors.md](./events-and-errors.md)**.

---

## Custom fields

Custom fields are key/value pairs you attach to a conversation. There are two scopes: **thread/contact** fields and **customer** fields. **Each value is limited to 1024 characters** (strings only, or `null`); exceeding it throws a `ChatSDKError`, as does a missing ident or value.

### Thread / contact custom fields

Set them on the `Thread` (or `LivechatThread`):

```ts
thread.setCustomField('orderId', '12345');                 // single field
thread.setCustomFields({ orderId: '12345', tier: 'gold' }); // multiple
thread.removeCustomField('tier');                          // remove (local)
```

Behavior depends on whether the contact already exists on the platform:

- **Before the contact exists** (no `CONTACT_CREATED` / recover yet): fields are stored locally in the SDK. They are **attached to the first message** that creates the contact — you don't need to send them separately.
- **After the contact exists**: `setCustomField(s)` stores the value **and** sends it to the platform immediately (a `setName`-style update event), so set them whenever you like.

Remember the *closed* behavior from the contact-lifecycle section: when the contact closes, the SDK clears these fields.

### Customer custom fields

Customer-scoped fields live on the `Customer` and persist across the customer's threads:

```ts
const customer = sdk.getCustomer();
customer.setCustomField('loyaltyId', 'ABC-987');
customer.setCustomFields({ loyaltyId: 'ABC-987', segment: 'vip' });
```

Same existence rule applies: customer fields are stored locally and **sent after the contact/customer exists** (after the first message or a recover). If you set them earlier, they ride along with the first message.

### Helper functions and types

The SDK exports helpers for converting between the array form the platform uses and the plain-object form that's convenient in app code:

| Export | Purpose |
|---|---|
| `CustomFieldsObject` | The object shape: `Record<ident, value>` — e.g. `{ orderId: '12345' }`. |
| `getCustomFieldsArray(fieldsMap)` | Converts the SDK's internal field map to an `Array<{ ident, value }>`. |
| `getCustomFieldsFromArray(fieldsArray)` | Converts an `Array<{ ident, value }>` (as the platform delivers in events) into a `CustomFieldsObject`. |

```ts
import { getCustomFieldsFromArray, CustomFieldsObject } from '@nice-devone/nice-cxone-chat-web-sdk';

// e.g. turn custom fields received in an event into an easy-to-read object:
const fields: CustomFieldsObject = getCustomFieldsFromArray(eventCustomFields);
```

---

## Group chat

Group chat lets multiple participants join a single contact via invitation. The SDK exposes these as **standalone functions** (not methods on `Thread`) that each take a payload plus the WebSocket client from `sdk.getWebsocketClient()`. Each comes as a pair: a `create…PayloadData(...)` builder and a `send…Event(payload, wsClient)` sender.

| Builder | Sender | Purpose |
|---|---|---|
| `createCreateInvitationToGroupChatPayloadData(contactId)` | `sendCreateInvitationToGroupChatEvent(payload, wsClient)` | Create an invitation for a contact (returns an invitation code). |
| `createSendEmailInvitationToGroupChatPayloadData(contactId, invitationCode, email)` | `sendEmailInvitationToGroupChatEvent(payload, wsClient)` | Email an invitation code to a recipient. |
| `createJoinGroupChatPayloadData(code)` | `sendJoinGroupChatEvent(payload, wsClient)` | Join a group chat using an invitation code. |
| `createLeaveGroupChatPayloadData(contactId)` | `sendLeaveGroupChatEvent(payload, wsClient)` | Leave a group chat. |

```ts
import {
  createCreateInvitationToGroupChatPayloadData,
  sendCreateInvitationToGroupChatEvent,
} from '@nice-devone/nice-cxone-chat-web-sdk';

const ws = sdk.getWebsocketClient();
const payload = createCreateInvitationToGroupChatPayloadData(contactId);
await sendCreateInvitationToGroupChatEvent(payload, ws);
```

The senders throw on failure (`CreateInvitationFailedError`, `SendEmailInvitationFailedError`, `JoinGroupChatFailedError`); `isJoinGroupChatFailedError(error)` is exported to narrow the join error.

When participants change, the platform pushes **`CONTACT_RECIPIENTS_CHANGED`** (`ChatEvent.CONTACT_RECIPIENTS_CHANGED`, string type `"ContactRecipientsChanged"`). Listen for it to keep your participant list in sync:

```ts
sdk.onChatEvent(ChatEvent.CONTACT_RECIPIENTS_CHANGED, (event) => {
  updateParticipants(event.detail.data.contact);
});
```

---

## Related guides

- **[getting-started.md](./getting-started.md)** — install, initialize, open a thread, send and receive your first messages.
- **[connection-guidance.md](./connection-guidance.md)** — the connect/reconnect lifecycle, recovery on every `OPEN`, and `FetchThreadList` vs `Recover` in full.
- **[events-and-errors.md](./events-and-errors.md)** — the full catalog of push events and SDK error types, and how to handle them.
- **[messaging-and-rich-content.md](./messaging-and-rich-content.md)** — sending text, attachments, postbacks, and rich content.
- **[proactive-and-visitors.md](./proactive-and-visitors.md)** — proactive chat triggering, visitors, and page views.
