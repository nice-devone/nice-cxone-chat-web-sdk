# Chat Web SDK — Configuration Reference

This is the configuration reference for the **NICE CXone Chat Web SDK** (`@nice-devone/nice-cxone-chat-web-sdk`). It documents every option you can pass to the `ChatSdk` constructor, the environments you can connect to, how storage and caching work, custom request metadata, and the channel-info APIs.

If you are just getting started, read **getting-started.md** first, then come back here for the full option list. For the connection lifecycle see **connection-guidance.md**, and for the authentication models see **authentication.md**.

```ts
import ChatSdk, { EnvironmentName, CacheStorage } from '@nice-devone/nice-cxone-chat-web-sdk';

const sdk = new ChatSdk({
  brandId,
  channelId,
  environment: EnvironmentName.NA1,
  customerId,
  storage: window.localStorage,
  cacheStorage: new CacheStorage(window.localStorage),
});
```

---

## `ChatSDKOptions` reference

You pass a single options object to `new ChatSdk(...)`. The table below lists every supported option.

| Option | Type | Required? | Default | Purpose |
|---|---|---|---|---|
| `brandId` | `number` | **Yes** | — | Identifies your CXone brand (business unit). |
| `channelId` | `string` | **Yes** | — | Identifies the chat channel within the brand. |
| `environment` | `EnvironmentName` | **Yes** | — | Which CXone region/cluster to connect to. See [Environments](#environments). Use `EnvironmentName.custom` together with `customEnvironment` to point at your own endpoints. |
| `customEnvironment` | `EnvironmentEndpoints` | Only when `environment` is `EnvironmentName.custom` | — | Explicit endpoint URLs to use instead of the built-in ones. Ignored for non-custom environments. See [Environments](#environments). |
| `storage` | `IStorage \| null` | **Yes** (may be `null`) | — | Where the SDK persists the visitor id and identity token across reloads. Pass `window.localStorage`, a compatible object, or `null` to disable persistence. See [Storage & caching](#storage--caching). |
| `cacheStorage` | `ICacheStorage \| null` | **Yes** (may be `null`) | — | Where the SDK caches the short-lived session transaction token (with a TTL). Pass a `CacheStorage` instance or `null` to disable caching. See [Storage & caching](#storage--caching). |
| `customerId` | `string` | **Yes**, unless `securedSession` is set | — | Stable identifier for the end customer. Required for the standard flow; when you configure `securedSession`, the identity is established by the session instead and `customerId` becomes optional. |
| `customerName` | `string` | No | — | Display name for the customer, applied to the customer profile on connect. |
| `customerImage` | `string` | No | — | Avatar URL for the customer, applied to the customer profile on connect. |
| `language` | `string` | No | Detected from the browser | Preferred language/locale (e.g. `"en"`, `"en-US"`). Drives channel translations and locale-specific content. |
| `isLivechat` | `boolean` | No | — | Marks this instance as a live-chat (synchronous) session rather than asynchronous messaging. Set this to match the channel type. |
| `visitId` | `string` | No | — | Associates the session with a known web-analytics visit. |
| `visitorId` | `string` | No | Generated and persisted by the SDK | Associates the session with a known web-analytics visitor. If omitted, the SDK reuses the value in `storage` or generates a new one. |
| `destinationId` | `string` | No | — | Routing/destination identifier used in event payloads to target a specific destination. |
| `securedSession` | `SecureSessionsType` | No | — | Enables a Secured Session authentication model (`SecureSessions.ANONYMOUS`, `SECURED_COOKIES`, or `THIRD_PARTY`), or `null` for none. See **authentication.md**. |
| `isAuthorizationEnabled` | `boolean` | No | — | Indicates the channel requires customer authorization (OAuth). Forced on automatically when the Secured Session type is `THIRD_PARTY`. See **authentication.md**. |
| `authorizationCode` | `string` | No | — | OAuth authorization code for the legacy authorization flow. Can also be passed later to `connect(authorizationCode)`. See **authentication.md**. |
| `identityToken` | `string` | No | — | Pre-existing identity token used to resume an authenticated session. See **authentication.md**. |
| `isThirdPartyCookiesSupported` | `boolean` | No | — | Tells the SDK whether the embedding context allows third-party cookies, affecting the secured-cookie strategy. See **authentication.md**. |
| `onAuthorization` | `AuthorizationCallback` | No | — | Callback invoked with the authorization result. See **authentication.md**. |
| `onError` | `ErrorCallback` | No | — | Callback invoked with any `Error` the SDK raises. If omitted, errors are thrown instead. Strongly recommended. |
| `onRawEvent` | `RawEventCallback` | No | — | Callback invoked for every raw chat event received over the socket. Use it to route events into your application. |

### Notes on required options

- **`storage` and `cacheStorage` must always be present** in the options object, but each accepts `null`. Passing `null` disables that mechanism (see [Storage & caching](#storage--caching) for what you lose).
- **`customerId` is required for the standard flow.** It may be omitted only when you provide a `securedSession`; in that case the SDK derives identity from the session and throws if neither is present.
- **`customEnvironment` is required only when `environment` is `EnvironmentName.custom`.** For any built-in environment, omit it.

### Callback signatures

```ts
type AuthorizationCallback = (
  status: 'success' | 'error',
  response: Partial<TransactionTokenResponse>,
) => void;

type ErrorCallback = (error: Error) => void;

type RawEventCallback = (event: ChatCustomEvent) => void;
```

---

## Environments

The `environment` option selects which CXone region your chat traffic goes to. The SDK derives the chat REST endpoint, the WebSocket gateway, and the OAuth service from the environment name — you do not configure URLs yourself unless you use a custom environment.

| `EnvironmentName` | Region / purpose |
|---|---|
| `NA1` | North America (primary) |
| `NA2` | North America — government cloud |
| `EU1` | Europe |
| `EU2` | Europe — sovereign cloud |
| `UK1` | United Kingdom |
| `UK2` | United Kingdom — sovereign cloud |
| `AU1` | Australia |
| `AU2` | Australia — sovereign cloud |
| `CA1` | Canada |
| `JP1` | Japan |
| `KR1` | South Korea |
| `AE1` | United Arab Emirates |
| `JO1` | Jordan |
| `ZA1` | South Africa |
| `custom` | Bring-your-own endpoints (requires `customEnvironment`) |

```ts
import ChatSdk, { EnvironmentName } from '@nice-devone/nice-cxone-chat-web-sdk';

const sdk = new ChatSdk({
  brandId,
  channelId,
  customerId,
  environment: EnvironmentName.EU1,
  storage: window.localStorage,
  cacheStorage: null,
});
```

### How endpoints are derived

For every built-in environment the SDK builds three endpoints from the region's public DNS:

- **chat** — the HTTPS endpoint for chat REST calls (channel info, availability, etc.).
- **gateway** — the secure WebSocket (`wss://`) endpoint for the real-time chat connection.
- **authorize** — the HTTPS endpoint for the OAuth authorization service.

You do not need to know the exact host names; supplying the `EnvironmentName` is enough.

### Custom environment

To target endpoints the SDK does not know about (for example, an isolated or self-hosted deployment), set `environment: EnvironmentName.custom` and provide an `EnvironmentEndpoints` object:

```ts
interface EnvironmentEndpoints {
  chat: string;       // https://... chat REST base URL
  gateway: string;    // wss://...  WebSocket gateway URL
  authorize: string;  // https://... OAuth service URL
  name: string;       // a label for this environment
}
```

```ts
import ChatSdk, { EnvironmentName } from '@nice-devone/nice-cxone-chat-web-sdk';

const sdk = new ChatSdk({
  brandId,
  channelId,
  customerId,
  environment: EnvironmentName.custom,
  customEnvironment: {
    name: 'my-environment',
    chat: 'https://chat.example.com',
    gateway: 'wss://gateway.example.com',
    authorize: 'https://oauth.example.com',
  },
  storage: window.localStorage,
  cacheStorage: null,
});
```

All four fields are required for a custom environment.

---

## Storage & caching

The SDK uses two independent storage mechanisms, each supplied via its own option. Both are required keys in the options object, and both accept `null` to opt out.

### `storage` — `IStorage`

A persistent key-value store used to keep session-identifying values across page reloads:

- the **visitor id** (so a returning visitor is recognised), and
- the **identity token** (so an authenticated session can be resumed).

The interface is a subset of the Web Storage API:

```ts
interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, data: unknown): void;
  removeItem(key: string): void;
}
```

`window.localStorage` satisfies this interface directly, so the common case is:

```ts
storage: window.localStorage,
```

Passing `storage: null` disables persistence: the visitor id is regenerated on each load and authenticated sessions cannot be resumed from storage.

### `cacheStorage` — `ICacheStorage`

A TTL-aware cache used for the short-lived **session transaction token**. Each entry stores a value together with an expiry time, and expired entries are evicted automatically on read.

```ts
interface ICacheStorage {
  getItem<T = unknown>(key: string): T | null;
  setItem(key: string, data: unknown, ttl: number): void; // ttl in milliseconds
  removeItem(key: string): void;
}
```

The SDK ships a ready-made `CacheStorage` class that wraps a DOM `Storage` object — `window.localStorage` or `window.sessionStorage` (not a custom `IStorage` implementation) — and serialises values as JSON. It accepts an optional `keyPrefix` so you can namespace entries (useful when multiple widgets share the same `localStorage`):

```ts
import { CacheStorage } from '@nice-devone/nice-cxone-chat-web-sdk';

const cacheStorage = new CacheStorage(window.localStorage, 'myapp_');

const sdk = new ChatSdk({
  brandId,
  channelId,
  customerId,
  environment: EnvironmentName.NA1,
  storage: window.localStorage,
  cacheStorage,
});
```

Passing `cacheStorage: null` disables transaction-token caching; the SDK will fetch a fresh token when needed instead of reusing a cached one.

### Privacy & SSR considerations

- **Privacy:** the SDK never persists anything when you pass `null`. Choose `sessionStorage` over `localStorage`, or `null`, if you do not want identifiers to survive a browser restart.
- **Server-side rendering:** `window.localStorage` does not exist on the server. Only construct `storage`/`cacheStorage` (and the SDK) in the browser, or pass `null` until you are client-side.
- **Shared pages:** when more than one chat widget can run on the same origin, give each its own `CacheStorage` `keyPrefix` to avoid key collisions.

---

## Channel info & availability

Before (or after) connecting, you can read a channel's configuration and online status. There are two ways to do this.

### Instance methods

Once you have a `ChatSdk` instance, call:

```ts
const info = await sdk.getChannelInfo();
const { status } = await sdk.getChannelAvailability(); // 'online' | 'offline'
```

These use the brand, channel, environment, and language already configured on the instance.

### Standalone functions

The standalone `getChannelInfo` / `getChannelAvailability` functions do **not** require a constructed or connected SDK, so you can call them early — for example to decide whether to render the chat entry point at all. `getChannelInfo` takes the brand, channel, an optional language, and an options object that carries the environment (and `customEnvironment` when the environment is `custom`); `getChannelAvailability` takes the same arguments **without** the language parameter:

```ts
import {
  getChannelInfo,
  getChannelAvailability,
  EnvironmentName,
} from '@nice-devone/nice-cxone-chat-web-sdk';

const availability = await getChannelAvailability(brandId, channelId, {
  environment: EnvironmentName.NA1,
});

if (availability.status === 'online') {
  const info = await getChannelInfo(brandId, channelId, 'en-US', {
    environment: EnvironmentName.NA1,
  });
  // render chat using info...
}
```

### Key `ChannelInfo` fields

`getChannelInfo()` returns a rich `ChannelInfo` object. The fields a client typically cares about:

| Field | Type | Meaning |
|---|---|---|
| `isLiveChat` | `boolean` | Whether this is a live-chat channel (vs asynchronous messaging). |
| `isAuthorizationEnabled` | `boolean` | Whether the channel requires customer authorization. |
| `name` | `string` | Human-readable channel name. |
| `settings.fileRestrictions` | object | File upload rules: `isAttachmentsEnabled`, `allowedFileSize`, and `allowedFileTypes` (a list of `{ description, mimeType }`). |
| `settings.features` | object | Feature flags for the channel — e.g. `isProactiveChatEnabled`, `isFeatureQueueCountingEnabled`, `isCreditCardMaskingEnabled`, `securedSessions`, `isWebAnalyticsEnabled`. Use these to decide which UI to show. |
| `translations` | `Record<string, string>` | Localised UI strings for the requested language. |
| `colors` | object | Brand/theme colours to style your chat UI. |
| `widget` | object | Widget presentation settings. |
| `preContactForm` | object \| `null` | Pre-chat form definition, or `null` when none is configured. |

`getChannelAvailability()` returns just `{ status: 'online' | 'offline' }`, making it the cheaper call when you only need to know whether to offer chat.

---

## Next steps

- **getting-started.md** — install the SDK and open your first connection.
- **authentication.md** — Secured Sessions, authorization codes, identity tokens, and the related options.
- **connection-guidance.md** — the connection lifecycle, reconnect behavior, and the events to listen to.
