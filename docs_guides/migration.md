# Migrating & Upgrading the NICE CXone Chat Web SDK

This guide helps you move an existing integration of `@nice-devone/nice-cxone-chat-web-sdk` to a newer version. It focuses on **what changed**, **what you must do about it**, and **what is worth adopting** — so you can upgrade with confidence rather than guessing from a diff.

## How to read this guide

- Start with **Deprecated APIs and their replacements** — these are calls you may still be using that you should migrate away from.
- Then read **Upgrading to 3.x**, which lists every breaking change you must account for, each as *what changed → what you must do*.
- **Notable additions worth adopting** points you at new capabilities you can opt into.
- **Version-by-version highlights** is a quick scan of what each recent release changed, taken straight from the changelog.

### A note on versioning

The SDK follows [semantic versioning](https://semver.org/). The rule that matters for upgrades:

> **Breaking changes only land in a major version bump** (e.g. `2.x → 3.0.0`).

Minor (`3.1`, `3.2`, `3.3`) and patch releases add features and fix bugs without breaking your existing code. So if you are moving *within* a major (say `3.0` → `3.3`), you can adopt the new features at your own pace and nothing should break. If you are crossing a major boundary (`2.x` → `3.x`), read **Upgrading to 3.x** carefully — that's where the required changes live.

---

## Deprecated APIs and their replacements

These symbols still exist (or, in one case, never existed in the public API) but should not be used in new or upgraded code. Migrate to the replacement column.

| Deprecated / removed | Replacement | Notes |
|---|---|---|
| `sdk.authorize(authorizationCode?, visitorId?, browserFingerprint?)` | **Secured Sessions** — set the `securedSession` option and call `sdk.connect()` | The legacy authorization event is `@deprecated`. With a Secured Session the chat gateway authenticates the socket directly; you never call `authorize()` and never handle a token. See **[authentication.md](./authentication.md)**. If you are still on the legacy flow, `authorize()` continues to work — but plan to migrate. |
| `sdk.generateAuthorizationToken(threadId, url)` | *(nothing — remove the call)* | `@deprecated`: additional message content is now fetched **internally** by the SDK. You no longer need to generate a token or fetch extra content yourself. The `MessageCreated` event downloads any additional content automatically. |
| `MessageType.POSTBACK` (constructing a postback message by hand) | `thread.sendPostbackMessage(postback, messageText)` | `MessageType.POSTBACK` is deprecated. Send postbacks through the `Thread` method, which now emits the postback as a `MessageType.TEXT` message (the `postback` value is still carried for backwards compatibility). Don't assemble postback message payloads manually. |
| `parseAgentName(...)` | **`splitName(name)`** — or build the name from the agent's `firstName` / `surname` directly | `parseAgentName` is **not** part of the public API and never was — if older documentation or sample code referenced it, that reference was incorrect. To split a single display name into parts, use the exported `splitName` helper. To compose an agent's display name, read `firstName` and `surname` off the assignee (see below). |

### Composing an agent (assignee) display name

There is no `parseAgentName` helper. To display the name of an assigned agent, build it from the fields on the user/assignee object — for an agent that is `firstName` + `surname`:

```ts
const agentName = `${assignee.firstName ?? ''} ${assignee.surname ?? ''}`.trim();
```

If instead you have a single combined name string and need to split it into first/last parts, use the exported helper:

```ts
import { splitName } from '@nice-devone/nice-cxone-chat-web-sdk';

const [firstName, lastName] = splitName('Ada Lovelace');
// firstName === 'Ada', lastName === 'Lovelace'
```

`splitName` takes everything before the first space as the first name and the remainder as the last name. (For *inbound* customer messages the SDK uses the end-user identity's full name; the `firstName`/`surname` split applies to agents/users.)

---

## Upgrading to 3.x

`3.0.0` is the only breaking release on the current line. Everything below comes from the `[3.0.0]` changelog entry. Work through each item — they are independent of one another.

### 1. `createdAt` / `createdAtWithMilliseconds` are now `string`, not `Date`

**What changed.** On `ChatEvent`, the `createdAt` and `createdAtWithMilliseconds` properties are now typed as `string` instead of `Date`. *(Marked `[BREAKING]` in the changelog.)*

**What you must do.** Stop treating these as `Date` objects. Anywhere you previously called date methods directly (e.g. `event.createdAt.getTime()`), parse the string first:

```ts
// Before (2.x): createdAt was a Date
const ms = event.createdAt.getTime();

// After (3.x): createdAt is an ISO string
const ms = new Date(event.createdAt).getTime();
```

Audit any sorting, formatting, or comparison logic that assumed a `Date`.

### 2. Error types now extend `ChatSDKError` and carry a `cause`

**What changed.** All SDK error types now extend the base `ChatSDKError`, and `ChatSDKError` carries the original error in its `cause` property for better tracing.

**What you must do.** You can now catch a single base type and still get the original error:

```ts
import { ChatSDKError, isChatSDKError } from '@nice-devone/nice-cxone-chat-web-sdk';

try {
  await sdk.connect(authCode);
} catch (err) {
  if (isChatSDKError(err)) {
    console.error(err.message);   // SDK-formatted message
    console.error(err.cause);     // the underlying original error
  }
}
```

If you previously matched on concrete error subclasses, those `instanceof` checks still work (subclasses are preserved). Prefer `isChatSDKError(err)` for a general guard, then inspect `err.cause` / `err.data` for specifics.

### 3. `Customer.setId` always stores the id as a `string`

**What changed.** `Customer.setId` now coerces its input with `.toString()`, so the stored identity id is always a string regardless of what you pass.

**What you must do.** If you passed a numeric id and later read it back expecting a number, update that code to expect a string. This is the safer behaviour (consistent type handling); in practice most integrations already pass strings and need no change.

### 4. `ChatSDKOptions` expanded — and `storage` / `cacheStorage` are now required

**What changed.** The options object gained several new fields, and two of them are **required**:

- `storage` — long-term storage (e.g. tokens). Pass `localStorage` directly, a custom `IStorage` implementation, or `null` to disable persistence. **Required.**
- `cacheStorage` — caching backend. Pass a `CacheStorage` instance, a custom `ICacheStorage`, or `null` to disable caching. **Required.** *(Introduced as an option in `2.0.0`; in the current surface it must be supplied explicitly.)*
- `securedSession` — the Secured Session authentication model (see **[authentication.md](./authentication.md)**).
- `onAuthorization` — callback invoked on successful (or failed) authorization.
- `isThirdPartyCookiesSupported` — flag for the fallback authorization flow used when third-party cookies are blocked and `securedSession` is set to `SECURED_COOKIES`.

**What you must do.** `storage` and `cacheStorage` are not optional — you must include both keys when constructing the SDK, even if you set them to `null`. A previously valid `2.x` options object that omitted them will no longer type-check.

```ts
import {
  ChatSdk,
  CacheStorage,
  EnvironmentName,
} from '@nice-devone/nice-cxone-chat-web-sdk';

const sdk = new ChatSdk({
  brandId,
  channelId,
  environment: EnvironmentName.NA1,

  // Required in 3.x — provide a backend or null to disable:
  storage: window.localStorage,        // or null
  cacheStorage: new CacheStorage(window.localStorage),    // or null

  // Optional, recommended:
  securedSession: /* SecureSessions.XY */,
  onAuthorization: (status, response) => { /* ... */ },
  isThirdPartyCookiesSupported: true,

  onError: (e) => console.error(e),
  onRawEvent: (e) => { /* route events */ },
});
```

See **[configuration.md](./configuration.md)** for the full option reference.

> **If you are coming from before `2.0.0`:** also note the `2.0.0` breaking changes — the `connect()` method replaced auto-connecting in the constructor (replace deprecated `authorize` calls in place), `temporaryAttachmentsUpload` was removed in favour of `sendAttachments`, and static usage of the `Customer` class was removed. See **Version-by-version highlights** below.

---

## Notable additions worth adopting

You don't *have* to use these, but they make integrations simpler and more robust.

- **Secured Sessions.** The recommended authentication model. The gateway authenticates the socket directly, so your app never handles a token and skips `authorize()` entirely. Configure via the `securedSession` option. → **[authentication.md](./authentication.md)**
- **Streamed / GenAI message events.** The SDK exposes `StreamedMessageEventData` (with incremental `delta` and the accumulated `fullContent`) and an `isStreamedMessageEventData` guard, so you can render generative responses as they stream in rather than waiting for the full message. → **[events-and-errors.md](./events-and-errors.md)**
- **Persistent menu.** `sdk.getPersistentMenuItems()` returns the channel's configured `PersistentMenuItem[]`, letting you render a persistent quick-action menu. *(Added in `3.2.0`.)*
- **Richer `ChatSDKError`.** Errors now carry `cause` (the original error), structured `data`, and — for fetch-originated failures — a `probableCause` bucket (`offline`, `network-failure`, `browser-blocked`, `http-4xx`, `http-5xx`, `user-aborted`, `unknown`) plus `navigatorOnLine` / `elapsedMs` diagnostics. Use these to give users a precise failure reason and to triage support reports. → **[events-and-errors.md](./events-and-errors.md)**
- **`WebSocketConnectionError` on exhausted retries.** When the SDK gives up reconnecting the WebSocket, it emits `WebSocketConnectionError`, which you can handle via your `onError` callback to show a permanent-failure state. *(Added in `3.2.0`.)*
- **Automatic GET retries.** Network-level `fetch` failures on GET requests are now retried automatically (up to 5 attempts, exponential backoff with jitter, respecting your `AbortSignal` and `timeout`). No action required — your reads are simply more resilient. *(Added in `3.3.0`.)*

---

## Version-by-version highlights

A condensed view of recent releases, taken from `CHANGELOG.md`. Use it to see exactly what each version touched.

### 3.3.0
- **Added:** automatic retry of network-level `fetch` (`TypeError`) failures on GET requests — up to 5 attempts with exponential backoff and jitter; respects `AbortSignal` and the `timeout` cap. HTTP error responses (incl. 429/5xx) and non-idempotent methods (POST, …) are **not** retried.
- **Changed:** README usage docs revised to accurately reflect the public SDK surface (required options, return types, event identifiers, helper functions).
- **Fixed:** `beforeunload` handler registration in `abortableFetch` (in-flight fetch is now actually aborted on page unload); nested `ChatSDKError`-in-`ChatSDKError` wrapping (inner error `data` flattened, not duplicated; subclasses like `AbortError` preserved as `cause`).

### 3.2.0
- **Added:** `sdk.getPersistentMenuItems(): Promise<PersistentMenuItem[]>` and the `PersistentMenuItem` type; optional `timeoutMs` for `fetchJSON` plus a 30s timeout on `getTransactionToken`.
- **Changed:** a new `WebSocketConnectionError` is emitted when WebSocket connection retries are exhausted (handle it via `onError`).
- **Fixed:** reconnection status display — `RECONNECTING` is emitted only while actively reconnecting; `CLOSE` is forwarded only once retries are exhausted.

### 3.1.0
- **Added:** `keyPrefix` parameter on the `CacheStorage` constructor for optional cache-key prefixing.
- **Changed:** the entire transaction-token response is now cached (not just the token value), fixing data-consistency issues; custom field values are now limited to **1024 characters** (over-limit values throw).

### 3.0.0 *(breaking — see "Upgrading to 3.x")*
- **Changed:** `[BREAKING]` `createdAt` / `createdAtWithMilliseconds` are now `string` not `Date`; error types extend `ChatSDKError`, which now carries the original error as `cause`; `Customer.setId` stores the id as a string; `ChatSDKOptions` expanded with `isThirdPartyCookiesSupported`, `onAuthorization`, and `storage` (with `storage` / `cacheStorage` required).

### 2.3.0
- **Added:** `requestMetadata` option and the `NetworkRequestMetadata` type; instance-free `getChannelInfo` / `getChannelAvailability` helpers.
- **Deprecated:** `generateAuthorizationToken` (additional message content is handled internally); `MessageCreated` now auto-downloads additional content.

### 2.2.0
- **Changed:** removed the static `init` method from `CustomerInstance`; use `sdk.getCustomer()` (low-level access via `getInstance`).

### 2.1.0
- **Changed:** `recoverThreadData` and `recoverLivechatThreadData` both return `ThreadRecoverFailedError` when a thread is not found; custom fields are sent only with the first message (later `setCustomField` updates are sent as separate events); added `thread.removeCustomField(customFieldId)` and a new `IpAddressBlockedError` (deliverable via `onError` on `connect()`).

### 2.0.0 *(breaking)*
- **Added:** explicit `connect()` method (no more auto-connect in the constructor); `resetSession()`; `cacheStorage` option (`CacheStorage` / `ICacheStorage`); `securedSession` option.
- **Removed:** `temporaryAttachmentsUpload` (use `sendAttachments`); static usage of the `Customer` class.
- **Changed:** restructured `ChatSDKOptions` for environment handling; reconnection disabled on initial connect to avoid retrying authorization errors.

---

## Related guides

- **[getting-started.md](./getting-started.md)** — install, initialize, open a thread, and send/receive your first messages.
- **[authentication.md](./authentication.md)** — Secured Sessions vs. legacy authorization, token lifecycle, and customer identity.
- **[configuration.md](./configuration.md)** — the full `ChatSDKOptions` reference, including the required `storage` / `cacheStorage` options.
- **[events-and-errors.md](./events-and-errors.md)** — the catalog of push events (including streamed messages) and the `ChatSDKError` family with `cause` and `probableCause`.
