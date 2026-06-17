# Chat Web SDK — Authentication & Customer Identity

How the SDK authenticates the chat session and establishes who the customer is. The SDK supports both **anonymous** and **authenticated** customers. **Secured Sessions are the current, preferred model** — you configure one `securedSession` mode and the chat gateway authenticates the socket for you. The legacy `sdk.authorize()` flow is **deprecated**; new integrations should not use it.

> This guide assumes you already know how to create an SDK instance and call `connect()`. If not, start with **[getting-started.md](./getting-started.md)** and **[configuration.md](./configuration.md)**.

---

## Choosing an approach

Pick exactly one model for your integration. In almost all cases it is a Secured Session.

| Your situation | Use | Identity comes from |
|---|---|---|
| No user accounts — chat is open to anonymous visitors | Secured Session `ANONYMOUS` | A `customerId` **you** generate and persist per visitor |
| You want the CXone platform to manage customer identity for you (no accounts, no id to manage) | Secured Session `SECURED_COOKIES` | A secured, HTTP-only identity cookie that the **CXone authentication service** issues and manages |
| You have your own Identity Provider (SSO / OAuth / OIDC) | Secured Session `THIRD_PARTY` | An OAuth **authorization code** your backend mints |
| Existing integration on the old token flow | Legacy `sdk.authorize()` — **deprecated** | The SDK exchanges an auth code for an access token it manages itself |

Secured Sessions and the legacy flow are mutually exclusive: when `securedSession` is set you **do not** call `authorize()`, and the gateway authenticates the WebSocket directly. Migrating off the legacy flow is covered in **[migration.md](./migration.md)**.

---

## Secured Sessions

Enable a Secured Session by passing the `securedSession` option when you construct the SDK. The value is a member of the exported `SecureSessions` enum:

```ts
import { ChatSdk, SecureSessions } from '@nice-devone/nice-cxone-chat-web-sdk';
```

| `SecureSessions` member | Value | Meaning |
|---|---|---|
| `SecureSessions.ANONYMOUS` | `'anonymous'` | Anonymous, app-supplied customer id |
| `SecureSessions.SECURED_COOKIES` | `'securedCookies'` | Server-managed identity via a cookie |
| `SecureSessions.THIRD_PARTY` | `'thirdParty'` | Identity from your own IdP via an authorization code |

> Secured Sessions must also be enabled for your channel on the platform side. Passing a value the SDK doesn't recognise throws immediately (`Expected a SecureSessions value, got …`). Passing `null` (or omitting the option) means "no Secured Session" — the legacy/standard flow.

The single most important per-mode rule concerns `customerId`:

| Mode | `customerId` | `authorizationCode` (to `connect`) | Cookie required | Notes |
|---|---|---|---|---|
| `ANONYMOUS` | **Required** — throws if missing/empty | Not used | No | You own and persist the id |
| `SECURED_COOKIES` | **Forbidden** — throws if passed | Not used | **Yes** — issued by the CXone auth service | Identity is created and managed by the platform |
| `THIRD_PARTY` | **Forbidden** — throws if passed | **Required** per `connect()` | No | `isAuthorizationEnabled` is forced `true` |

Passing `customerId` with `SECURED_COOKIES` or `THIRD_PARTY` throws `The CustomerId cannot be set when secured sessions are enabled`. Passing an empty `customerId` with `ANONYMOUS` throws `The CustomerId cannot be empty string when "anonymous" secured sessions are enabled`.

### `ANONYMOUS`

Use when there are no user accounts and you just need a stable identity per visitor. **You** generate the id and persist it (so a returning visitor keeps the same conversation). The SDK exposes `generateId()` if you need one.

```ts
import { ChatSdk, SecureSessions, generateId } from '@nice-devone/nice-cxone-chat-web-sdk';

// Reuse a previously stored id, or mint and persist a new one.
const customerId = localStorage.getItem('cx_customer_id') ?? generateId();
localStorage.setItem('cx_customer_id', customerId);

const sdk = new ChatSdk({
  brandId, channelId, environment,
  securedSession: SecureSessions.ANONYMOUS,
  customerId,                 // REQUIRED for ANONYMOUS
  cacheStorage,
  storage,
  onError: (e) => log(e),
});

await sdk.connect();          // no auth code in this mode
```

### `SECURED_COOKIES`

Use this when you want the **CXone platform to own customer identity** — there are no accounts to wire up and no `customerId` for you to generate. When `SECURED_COOKIES` is enabled for your channel, the CXone authentication service issues a secured, HTTP-only identity cookie the first time a visitor connects, and reads it back on later visits to recognise the returning visitor (generating a fresh identity for first-time visitors). The SDK sends its authentication request with credentials so the browser includes that cookie. **Your application never generates, sets, or reads the cookie, and you must not pass `customerId`** — the identity is created and owned by the platform. Provide `storage` so the third-party-cookie fallback (below) can keep identity stable when the browser blocks the cross-site cookie.

```ts
const sdk = new ChatSdk({
  brandId, channelId, environment,
  securedSession: SecureSessions.SECURED_COOKIES,
  // NO customerId here
  cacheStorage,
  storage,                    // needed for the third-party-cookie fallback (below)
  onError: (e) => log(e),
});

await sdk.connect();          // no auth code; the cookie carries identity
```

### `THIRD_PARTY`

Use when you have your own Identity Provider. Your backend performs the OAuth flow and mints a short-lived **authorization code**; you pass that code to `connect()`, and the gateway exchanges it. In this mode the SDK forces `isAuthorizationEnabled` to `true` for you, so you don't set it. **Do not** pass `customerId`.

```ts
const sdk = new ChatSdk({
  brandId, channelId, environment,
  securedSession: SecureSessions.THIRD_PARTY,
  // NO customerId here; isAuthorizationEnabled is forced true internally
  cacheStorage,
  storage,
  onError: (e) => log(e),
});

const authCode = await fetchAuthCodeFromBackend();   // short-lived; fetch fresh
await sdk.connect(authCode);                          // REQUIRED for THIRD_PARTY
```

The authorization code is one-time / short-lived: fetch a **fresh** code immediately before each `connect()` and never cache or reuse it (see *Anti-patterns*). Unlike the other modes, the SDK does **not** reuse a cached transaction response for `THIRD_PARTY`, so a new code is exchanged each time you connect.

---

## Third-party cookie fallback (`SECURED_COOKIES`)

Browsers increasingly block third-party cookies. Because the chat session can run in an embedded/cross-site context, a `SECURED_COOKIES` session may not be able to rely on its identity cookie. The SDK handles this with a token-based fallback:

- Your app detects whether third-party cookies are available and tells the SDK via the **`isThirdPartyCookiesSupported`** option (`true` = supported, `false`/omitted = treat as blocked).
- When cookies are **blocked** in `SECURED_COOKIES` mode, the SDK falls back to a stored **identity token**: the CXone auth service returns one in the response body, the SDK persists it through the **`storage`** option you provide, and replays it (as a bearer token) on subsequent connects so the service can keep the customer's identity stable. The identity token is a server-issued, signed token — the platform still owns the identity; the fallback only changes where it is carried (request body/header instead of a cookie).

What this means for you:

- **You are responsible for detecting cookie support.** The SDK does not probe the browser for you — pass the result as `isThirdPartyCookiesSupported`.
- **`storage` must be provided** for the fallback path to work. Without a `storage` implementation, the identity token cannot be persisted and a blocked-cookie customer will not be recognised across connects.

```ts
const sdk = new ChatSdk({
  brandId, channelId, environment,
  securedSession: SecureSessions.SECURED_COOKIES,
  isThirdPartyCookiesSupported: detectThirdPartyCookies(),  // YOUR detection
  storage,                                                  // REQUIRED for the fallback
  cacheStorage,
  onError: (e) => log(e),
});
```

> The fallback applies only to `SECURED_COOKIES`. `ANONYMOUS` (you own the id) and `THIRD_PARTY` (identity rides on the auth code) don't use the cookie path.

There is also an `identityToken` option you can pass at construction if you already hold a previously issued token (e.g. carried across a navigation). In normal use you don't set it — the SDK obtains and stores the token through `storage` for you.

---

## The `onAuthorization` callback

Pass `onAuthorization` to observe the result of the Secured Session token exchange:

```ts
type AuthorizationCallback = (
  status: 'success' | 'error',
  response: Partial<TransactionTokenResponse>,
) => void;
```

- On **success**, `status` is `'success'` and `response` is the (partial) transaction token response — including the resolved `customerIdentity`.
- On **error**, `status` is `'error'` and **`response` is an empty object (`{}`)** — it carries **no** error detail.

Because the error callback gives you nothing actionable, **get real error detail from `onError` or by catching the rejected `connect()` promise**, not from `onAuthorization`:

```ts
const sdk = new ChatSdk({
  /* …secured session options… */
  onAuthorization: (status) => {
    // Use for analytics / UI state only. On 'error', the second arg is {}.
    setAuthState(status);
  },
  onError: (err) => {
    // Real error detail lands here (and via the connect() rejection).
    reportAuthFailure(err);
  },
});

try {
  await sdk.connect(authCode);
} catch (err) {
  // The transaction-token request rejects connect() on failure — handle it here.
}
```

> The transaction-token request has a **~30 second timeout**. If the server doesn't respond in time, the request rejects and so does `connect()`.

---

## Customer identity

Identity is established differently per mode, but in all cases you read it back through the **`Customer`** object returned by `sdk.getCustomer()`.

| Option | Type | Purpose |
|---|---|---|
| `customerId` | `string` | Unique, **stable** identifier for the end customer. Required only for `ANONYMOUS` (and the legacy/standard flow); forbidden for `SECURED_COOKIES` / `THIRD_PARTY`. Reuse the same value for a returning visitor so their history is preserved. |
| `customerName` | `string` | Optional display name. |
| `customerImage` | `string` | Optional avatar URL. |

How identity is established per mode:

- **`ANONYMOUS`** — from the `customerId` you supply.
- **`SECURED_COOKIES`** — from the platform-managed identity cookie (or the identity-token fallback); the SDK fills in the resolved identity from the auth service's response. You don't create it.
- **`THIRD_PARTY`** — from the authorization code exchange; the SDK fills in identity (name, image, custom fields) from the server response.

### The `Customer` object

`sdk.getCustomer()` returns the live `Customer` instance. Its public methods:

| Method | Purpose |
|---|---|
| `getId()` / `setId(id)` | Read / set the customer's external-platform id. |
| `getName()` / `setName(name)` | Read / set the display name. |
| `getImage()` / `setImage(url)` | Read / set the avatar URL. |
| `getIdOrCreateNewOne()` | Return the current id, generating and storing a new one if none is set. |
| `setCustomField(name, value)` | Set a single customer custom field. Returns a promise once the session is established (the value is queued and sent after the first message / recover). |
| `setCustomFields(obj)` | Set several custom fields at once, e.g. `setCustomFields({ tier: 'gold' })`. |
| `getCustomFields()` | Read custom fields as an object. |
| `setCustomFieldsFromArray(arr)` / `getCustomFieldsArray()` | Set / read custom fields as an array of `CustomField`. |

```ts
const customer = sdk.getCustomer();
customer.setName('Ada Lovelace');
customer.setCustomFields({ plan: 'pro', region: 'eu' });
```

> With Secured Sessions, prefer **not** to overwrite `id`/`name`/`image` that the session resolved — the server-provided identity is authoritative. Use the `Customer` object mainly to read identity and to attach custom fields.

---

## Token lifecycle

- **The SDK refreshes tokens automatically**, scheduled at roughly **90% of the token's lifetime**, and reuses valid tokens across reconnects. You don't see or hold the token.
- **Do not implement your own refresh timer or token caching.** A manual refresh races with the SDK's scheduled refresh and can leave the socket with a rotated token.
- **Authorization codes (`THIRD_PARTY`) are short-lived and single-use.** Fetch a fresh code from your backend at the moment you call `connect()`. Don't cache or reuse a code — a stale code will be rejected.

---

## Switching user / logout

To end the current customer's session and start a new one, call `sdk.resetSession(...)`:

```ts
public async resetSession(
  customerId: string = generateId(),  // a freshly generated id if omitted
  customerName: string = '',
  customerImage: string = '',
  visitorId: string = generateId(),   // a freshly generated id if omitted
  visitId: string = generateId(),     // a freshly generated id if omitted
): Promise<void>
```

Every parameter has a default, so you can call `resetSession()` with no arguments to fully reset to a brand-new anonymous identity.

`resetSession()`:

- Disconnects the current WebSocket and **opens a fresh connection**.
- Clears in-memory session state: the cached transaction-token response, the access token, the third-party token, the thread cache, queued contact custom fields, and the `Customer` data.
- Re-initialises visitor/visit ids (generating new ones when not provided) and builds a new `Customer` from the arguments.

All arguments are optional; anything you omit is regenerated. Use it to log a user out locally, or to switch to a different customer.

> **`resetSession()` does not perform a server-side logout.** It clears the SDK's local session state and reconnects. For `THIRD_PARTY`, invalidate the OAuth session/tokens with your IdP as part of your own logout. For `SECURED_COOKIES`, the identity lives in a platform-managed, HTTP-only cookie that your code cannot clear — so a reconnect generally resolves the **same** customer again; `resetSession()` does not switch identities in that mode.

---

## Errors

| Error / signal | When | What to do |
|---|---|---|
| **`AuthorizationError`** | The legacy `authorize()` flow's authorization or token-refresh fails. Its message includes the underlying reason (`… because of (…)`). | Re-fetch the auth code and restart the flow, or migrate to a Secured Session. |
| **`IpAddressBlockedError`** (`name === 'ipAddressBlocked'`) | The customer's IP is blocked during the Secured Session token exchange. | Surface a blocked-access message; this is delivered to `onError` and also rejects `connect()`. |
| Transaction-token failure (Secured Sessions) | The token exchange fails for any other reason (including the ~30s timeout). | Reported via `onError` and rejects `connect()`. `onAuthorization('error', {})` also fires, but with no detail — read the error from `onError` / the `connect()` rejection. |

For the full catalog of SDK errors and push events, see **[events-and-errors.md](./events-and-errors.md)**.

---

## Anti-patterns

1. **Implementing your own token refresh.** The SDK refreshes at ~90% of token lifetime. A manual timer races with it and can leave the socket using a rotated token. **Let the SDK handle it.**
2. **Passing `customerId` with `SECURED_COOKIES` or `THIRD_PARTY`.** It throws — identity comes from the cookie or the auth code in those modes. Only `ANONYMOUS` (and the legacy flow) take a `customerId`.
3. **Treating `onAuthorization('error', {})` as having error detail.** The second argument is an empty object on error. Get the actual error from `onError` or by catching the `connect()` rejection.
4. **Caching or reusing authorization codes.** Codes are short-lived and single-use. Fetch a fresh one per `connect()`; a cached code will be rejected.
5. **Omitting `storage` for `SECURED_COOKIES`.** Without it, the third-party-cookie fallback can't persist the identity token, and blocked-cookie customers won't be recognised across connects.
6. **Still calling `authorize()` in new code.** It's deprecated. Use a Secured Session and skip `authorize()` entirely — see **[migration.md](./migration.md)**.

---

## Related guides

- **[getting-started.md](./getting-started.md)** — install, initialize, open a thread, send and receive your first messages.
- **[configuration.md](./configuration.md)** — every `ChatSDKOptions` field, including `securedSession`, `storage`, and the customer options.
- **[connection-guidance.md](./connection-guidance.md)** — the WebSocket lifecycle: connect, reconnect, heartbeat, and re-syncing session state.
- **[events-and-errors.md](./events-and-errors.md)** — the full catalog of push events and SDK error types, and how to handle them.
- **[migration.md](./migration.md)** — upgrading between SDK versions and moving off the legacy `authorize()` flow.
