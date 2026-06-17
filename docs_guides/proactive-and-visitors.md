# Chat Web SDK — Proactive Chat & Visitor Identity

How the **NICE CXone Chat Web SDK** (`@nice-devone/nice-cxone-chat-web-sdk`) surfaces *proactive* actions and visitor/visit identity to your application — what the platform pushes to your widget, what those payloads contain, and what your app is responsible for rendering.

**Proactive chat** lets the platform tell your widget to *take an action* — show a pop-up, post a welcome message, fire a push notification, render a guide template — based on rules configured server-side (which page the visitor is on, how far they've scrolled, how long they've been idle, and so on). The SDK delivers the instruction as an event; **your application decides whether and how to render it.** The SDK does not draw any UI for you.

**Visitor and visit identifiers** are what make this targeting (and the associated web analytics) work. They tell the platform *who* is browsing and *which session* this is, so the right proactive rule can be matched to the right person.

---

## Visitor vs visit — two different identifiers

The SDK works with two distinct identifiers. They are easy to confuse, so be deliberate about which you set.

| Identifier | Option | Lifetime | Who generates it |
|---|---|---|---|
| **Visitor id** | `visitorId` | **Persistent** across page loads and sessions for the same person | You, *or* the SDK (auto-generated and persisted) |
| **Visit id** | `visitId` | **Per browsing session** | You, *or* the SDK |

### `visitorId` — the persistent identity

`visitorId` identifies a *returning person* across page loads. Its resolution follows a fixed order of precedence:

1. **The value you pass** in `ChatSDKOptions.visitorId`, if any.
2. Otherwise, **the value previously persisted** by the SDK (read back from your `storage`).
3. Otherwise, **a new id is generated** and then persisted to `storage` for next time.

This is why you do **not** have to supply `visitorId` to get stable targeting and analytics — omit it and the SDK keeps a stable id for you, as long as you provide a `storage` (e.g. `window.localStorage`). If you pass `storage: null`, persistence is disabled and a fresh visitor id is generated on every load, which breaks "returning visitor" recognition.

**Supply your own `visitorId` when** you already track the visitor in your own system (for example, a logged-in user with a stable account id) and want the platform's analytics and proactive targeting to line up with that identity across devices or storage clears.

### `visitId` — the per-session identity

`visitId` associates the current session with a known web-analytics *visit*. A visit is a single browsing session, so this value is shorter-lived than `visitorId`. Supply your own `visitId` when your web-analytics layer already mints a visit id you want the chat session to share; otherwise leave it unset.

### Resetting identity

`sdk.resetSession(customerId?, customerName?, customerImage?, visitorId?, visitId?)` tears down the current session (disconnects the socket, clears tokens and cached customer data) and starts a fresh one. Any identifier you omit is **regenerated** — so calling `resetSession()` with no arguments gives the session brand-new customer, visitor, and visit ids. Pass explicit ids to carry a known identity into the new session.

> For the full constructor reference (where these options sit, the `storage` contract, and SSR notes), see **[configuration.md](./configuration.md)**.

---

## [DEPRECATED] Proactive actions — `ChatEvent.FIRE_PROACTIVE`

When the platform decides a proactive rule applies to the current visitor, it pushes a **`FireProactiveAction`** event over the live connection. You observe it by subscribing with `sdk.onChatEvent`:

```ts
import ChatSdk, { ChatEvent } from '@nice-devone/nice-cxone-chat-web-sdk';

// The payload shape, described for your own typing (event.detail.data is `unknown`):
type ProactiveAction = {
  action: { actionType: string; actionName: string; data?: Record<string, unknown> };
  conditions?: Array<{ conditionType?: string; data?: Record<string, unknown> }>;
};
type FireProactiveData = {
  destination?: { id: string };
  proactiveAction?: ProactiveAction;
};

const off = sdk.onChatEvent(ChatEvent.FIRE_PROACTIVE, (event) => {
  // event.detail.data is typed as `unknown` — narrow it yourself.
  const { destination, proactiveAction } = (event.detail.data ?? {}) as FireProactiveData;
  handleProactiveAction(destination, proactiveAction);
});

// Later, to stop listening:
off();
```

Like every SDK event, the handler receives a `ChatCustomEvent` whose payload is on `event.detail`, and `onChatEvent` returns a `RemoveListenerFunction` you call to unsubscribe. (See **[events-and-errors.md](./events-and-errors.md)** for the event model in full.)

### The payload

The `FireProactiveAction` payload (`event.detail.data`) has two parts:

```js
{
  "destination": {            // present only for some actions
    "id": "a-b-c-d"           // matches the destinationId you configured
  },
  "proactiveAction": {
    "action": { /* action details — see below */ },
    "conditions": [ /* zero or more rule conditions */ ]
  }
}
```

- **`destination.id`** corresponds to the **`destinationId`** you set in `ChatSDKOptions` (see below). It tells you *which* widget instance the action is aimed at. When several widgets share a connection, compare `destination.id` against your own configured `destinationId` and ignore actions that aren't for you.
- **`proactiveAction.action`** describes *what* to render. Its `actionType` field carries one of the proactive action type values below.
- **`proactiveAction.conditions`** lists the rule conditions attached to the action (e.g. scroll depth, current page, number of clicks). Some conditions resolve entirely server-side; others (like scroll depth) are meant to be evaluated client-side as the visitor interacts with the page. Evaluating dynamic conditions and deciding the exact moment to fire is **your application's responsibility.**

### Proactive action types

The `actionType` on `proactiveAction.action` is one of these string values. Switch on it to decide what UI to render:

| `actionType` value | Meaning |
|---|---|
| `PopupBox` | Show a standard proactive pop-up box. |
| `CustomPopupBox` | Show a custom-styled pop-up box. |
| `WelcomeMessage` | Post a proactive welcome message into the conversation and open the chat. |
| `PushNotification` | Trigger a push notification. |
| `GuideTemplate` | Render a CXone Guide template. |

```ts
function handleProactiveAction(
  destination: { id: string } | undefined,
  proactiveAction: ProactiveAction | undefined,
) {
  // If you configured a destinationId, only react to actions aimed at this widget.
  if (destination && destination.id !== MY_DESTINATION_ID) {
    return;
  }
  if (!proactiveAction) {
    return;
  }

  switch (proactiveAction.action.actionType) {
    case 'WelcomeMessage':
      showWelcomeMessage(proactiveAction);   // post the message + open the widget
      break;
    case 'PopupBox':
    case 'CustomPopupBox':
      showProactivePopup(proactiveAction);    // render your pop-up UI
      break;
    case 'GuideTemplate':
      showGuideTemplate(proactiveAction);     // render the guide template
      break;
    case 'PushNotification':
      firePushNotification(proactiveAction);
      break;
    default:
      // Unknown / future action type — ignore safely.
      break;
  }
}
```

> **The SDK does not render proactive actions.** It only delivers the instruction. Drawing the pop-up, posting the welcome message, evaluating dynamic conditions (scroll depth, idle time, clicks), and honouring timing are all the client's job.

### What rendering a welcome message looks like in practice

The reference chat widget handles a `WelcomeMessage` action by opening the chat window, auto-starting the session, and injecting the action's text as the first message. The text comes from the action's data payload (roughly `proactiveAction.action.data.content.bodyText`), and any handover custom fields on the action are applied to the contact. The widget also feeds back a "proactive action displayed" visitor event once it renders the message.

The shape of `action.data` varies by action type and reflects how the action was configured in the platform, so read it defensively (optional chaining, fall back to sensible defaults) rather than assuming fields are present. The takeaways for your own integration:

- **Gate on visibility and availability.** The reference widget only fires an action when the page is visible (`document.visibilitychange`) and the channel is online — don't pop a proactive message at a backgrounded tab.
- **Respect conditions and timing.** Conditions like scroll depth are evaluated as the visitor scrolls; the action fires only once *all* attached conditions pass, optionally after a configured delay.
- **Don't double-fire.** Track whether you've already shown a given action (especially a welcome message) so a repeated event doesn't post it twice.

---

## Page views — `ChatEvent.PAGE_VIEW_CREATED`

`ChatEvent.PAGE_VIEW_CREATED` (`"PageViewCreated"`) is a **server-pushed** event signalling that the platform recorded a new page view for the visitor. Subscribe to it exactly like any other event:

```ts
const off = sdk.onChatEvent(ChatEvent.PAGE_VIEW_CREATED, (event) => {
  // event.detail.data carries { brand, channel, pageView, thread }
  console.log('page view recorded', event.detail.data);
});
```

The payload (`event.detail.data`) carries the `brand`, `channel`, the `pageView` record itself, and the related `thread`. Most applications don't need to act on it — it's primarily informational and is what the platform uses to drive page-based proactive targeting.

> **This event is receive-only.** The SDK does **not** expose a client-side API to *send* a page view — there is no `sendPageView()` or equivalent on `ChatSdk`. Page views are produced server-side (by the platform's web-analytics layer); your widget only listens for the resulting `PageViewCreated` event. If your integration needs to report page navigations to the platform, that is handled by the platform's web-analytics tracking, not by this SDK.

---

## Browser fingerprint

A **browser fingerprint** is a snapshot of the visitor's environment — browser, OS, device type, language, and timezone/location — that the platform uses to enrich the contact and (in the legacy authorization flow) is attached when the session authorizes. The SDK builds it for you from the running browser.

### `getBrowserFingerprint(options?)`

```ts
import { getBrowserFingerprint } from '@nice-devone/nice-cxone-chat-web-sdk';

const fingerprint = getBrowserFingerprint();
// or, supplying server-derived geo data you already hold:
const enriched = getBrowserFingerprint({
  country: 'United States',
  ip: '203.0.113.10',
  location: 'New York',
});
```

`getBrowserFingerprint(options?: BrowserFingerprintOptions)` returns an object describing the environment:

| Field | Source |
|---|---|
| `browser`, `browserVersion` | Parsed from the user agent |
| `os`, `osVersion` | Parsed from the user agent |
| `deviceType` | `desktop`, `mobile`, or `tablet` (derived from the user agent; defaults to `desktop`) |
| `language` | The browser language (`navigator.language`) unless you override it |
| `location` | The browser's resolved timezone (e.g. `America/New_York`) unless you override it |
| `country` | **Empty string by default** — only set if you pass it in `options` |
| `ip` | **`null` by default** — only set if you pass it in `options` |
| `applicationType` | Always `browser` |

`BrowserFingerprintOptions` lets you override the fields the browser can't reliably determine on its own:

```ts
interface BrowserFingerprintOptions {
  country?: string | null;   // default ''
  ip?: string | null;        // default null
  language?: string;         // default navigator.language
  location?: string | null;  // default resolved timezone
}
```

Geolocation fields (`country`, `ip`) typically come from a server-side lookup, since the browser cannot determine them reliably. If you have them, pass them in; otherwise leave them and the defaults apply.

### Helper functions

These standalone helpers back `getBrowserFingerprint` and are exported in case you need them directly:

| Function | Returns |
|---|---|
| `getBrowserLanguage()` | The browser language (`navigator.language`). |
| `getBrowserLocation()` | The browser's resolved IANA timezone (e.g. `Europe/Prague`). |
| `getDeviceType(deviceType?)` | Maps a raw device-type string to `desktop` / `mobile` / `tablet` (defaults to `desktop`). |
| `getValidLanguage(language)` | Normalizes a language tag to a canonical locale (e.g. `en_US` → `en-US`), falling back to `en-US` if it can't. |

### Where the fingerprint is used

In the **legacy authorization flow**, you pass the fingerprint as the third argument to `sdk.authorize(authorizationCode, visitorId?, browserFingerprint?)`, where it enriches the authorized contact. Build it with `getBrowserFingerprint()` right before authorizing:

```ts
import { getBrowserFingerprint } from '@nice-devone/nice-cxone-chat-web-sdk';

ws.on(WebSocketClientEvent.OPEN, async () => {
  // Legacy auth only — skip entirely with Secured Session:
  await sdk.authorize(authCode, visitorId, getBrowserFingerprint());
});
```

> With the preferred **Secured Session** flow, you do not call `authorize()`, so you don't pass a fingerprint there. See **[connection-guidance.md](./connection-guidance.md)** and **[authentication.md](./authentication.md)** for the two authorization models.

---

## `destinationId`

`destinationId` (a `ChatSDKOptions` field) is the identifier that ties **this widget instance** to a proactive **destination**. When the platform fires a proactive action, the payload's `destination.id` is that same value. Configuring a `destinationId` lets you:

- **Target the right widget.** If a page hosts more than one widget (or one widget that should only react to a subset of actions), compare the incoming `destination.id` against your configured `destinationId` and ignore non-matching actions.
- **Tie proactive targeting to a specific placement.** The platform's proactive rules can be scoped to a destination, so the `destinationId` decides which rule set this widget participates in.

If you don't use proactive chat, you can leave `destinationId` unset. See **[configuration.md](./configuration.md)** for where it sits among the constructor options.

---

## Related guides

- **[getting-started.md](./getting-started.md)** — install, initialize, open a thread, send and receive your first messages.
- **[configuration.md](./configuration.md)** — every `ChatSdk` constructor option, including `visitorId`, `visitId`, `destinationId`, and the `storage` contract.
- **[events-and-errors.md](./events-and-errors.md)** — the full catalog of push events (including `FIRE_PROACTIVE` and `PAGE_VIEW_CREATED`), the `is*Event` type guards, and SDK error types.
- **[threads-and-livechat.md](./threads-and-livechat.md)** — the full thread lifecycle: messaging vs livechat, starting/ending chats, and thread state.
