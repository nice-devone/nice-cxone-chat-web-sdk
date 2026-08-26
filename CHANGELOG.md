# Changelog

## [3.4.0]

### Added

- OAuth **implicit grant** and **PKCE** support for 3rd-party OAuth. Two new `ChatSDKOptions` fields — `accessToken` (an access token you already hold) and `codeVerifier` (PKCE) — plus a new exported `ThirdPartyCredentials` type. `ChatSdk.connect()` and the deprecated `ChatSdk.authorize()` now accept either an authorization-code string (unchanged) or a `ThirdPartyCredentials` object, so the grant can be selected explicitly. Two behaviours worth knowing: the implicit grant wins if both credential kinds are supplied, and a blank credential counts as none at all, so it falls back to what `ChatSDKOptions` supplied rather than replacing it. On the object form `grantType` is required and validated at runtime — `connect()` / `authorize()` throw a `ChatSDKError` if it is missing or unrecognised, since the union only binds TypeScript callers; a bare authorization-code string needs no `grantType`. An implicit access token must stay valid for the whole conversation — there is no refresh token to renew it with. See `docs_guides/authentication.md` for the grants, the precedence rule and the PKCE call shape, and `docs_guides/configuration.md` for the new options.
- New optional `botProtection` parameter on `ChatSdk.connect(authorizationCode?, botProtection?)` with the `BotProtection` type (`{ provider: 'recaptcha' | 'turnstile', token }`). When provided, the token is sent as the flat `captchaToken` field in the `POST /oauth/token` request body of the initial authorization grant only — it is consumed after a successful grant and never included in `refresh_token` grants.
- The `captcha_required` error code from the token endpoint is now detected and surfaced through `onError` as a new typed `CaptchaRequiredError`, exported from the public API alongside the existing `IpAddressBlockedError`.
- New `ChatSdk.retryAuthorization(botProtection: BotProtection): Promise<boolean>` method to recover from a rejected authorization grant (e.g. after a `CaptchaRequiredError`) with a fresh bot-protection token.

### Changed

- `onError` now receives `Error` subclasses unchanged; only a non-`Error` throw is wrapped in a `ChatSDKError`. This preserves `name` and `instanceof` for `SdkVersionNotSupported`, `WebSocketClientError` and `WebSocketConnectionError`, which were previously flattened to `ChatSDKError`. **Behavior change**: branch on the specific type or on `name` rather than on `instanceof ChatSDKError`.
- **Breaking change**: removed `ChatSdk.getPersistentMenuItems()` and the `PersistentMenuItem` type export. The persistent menu is now sourced from Cognigy; consumers that need it should read it from their Cognigy endpoint directly instead of calling the SDK.

### Fixed

- Fixed a rejected authorization grant leaving the SDK permanently unresponsive during a secured session: `connect()` never settled (so anything awaiting `ready()` hung forever) and a retried `connect()` silently returned `false`. A rejected grant now rejects `connect()` / `ready()`, and `retryAuthorization()` recovers the instance.
- Fixed `IpAddressBlockedError` never reaching `onError`: `isIpAddressBlockedError()` read the wrong path on the error produced by fetch failures, so IP-address-blocked handling was always a no-op. **Behavior change**: IP blocking now surfaces as originally intended.
- Fixed `onError` firing twice for a rejected authorization grant — once with the SDK's own typed error, and again with a generic `WebSocketClientError` echoed by the internal reconnect layer.

## [3.3.1]

### Fixed

- Fixed `resetSession()` leaving the `CustomerInstance` singleton out of sync with the new session identity.

## [3.3.0]

### Added

- `TypeErrors` from `fetch` — e.g., when the connection drops before any bytes are exchanged — are now retried automatically. Network-level failures on GET requests are retried up to 5 total attempts with exponential backoff and jitter. HTTP error responses, including 429 and 5xx, are not retried, since the server has already explicitly chosen to refuse the request. Retries respect the caller-provided `AbortSignal` and the `timeout` option, which caps total time across all attempts. `POST` and other non-idempotent methods are not retried.
- Developer documentation guide set under `docs_guides/` — getting started, configuration reference, authentication (Secured Sessions), connection/reconnect & heartbeat, events & errors, messaging & rich content, threads & livechat, proactive & visitors, and migration — linked from the README. Published with the package via the existing `docs_*` release step.

### Changed

- Revised the README usage documentation to accurately reflect the public SDK surface, including required initialization options, method return types, event identifiers, and supported helper functions.

### Fixed

- Resolved a WebSocket connectivity issue in environments where the chat gateway host diverged from the canonical pattern. `buildEnvironmentEndpoints()` now resolves to `wss://chat-gw-de-{env}.{publicDNS}`, matching the deployed gateway across every supported region and restoring connectivity for affected SDK consumers.
- Fixed `beforeunload` handler registration in `abortableFetch` so an in-flight fetch is actually aborted when the page unloads.
- Fixed nested `ChatSDKError` inside `ChatSDKError` when wrapping a fetch failure: the inner error's `data` is now flattened onto the outer instead of duplicated. Non-`Error` throws (cross-realm `TypeError`, plain objects) get a fixed `Unknown error` message with the raw value stashed on `additionalInfo._thrownValue`. Subclasses of `ChatSDKError` (e.g. `AbortError`) are preserved as `cause` so `instanceof` checks against the subclass still work; only direct `ChatSDKError` instances have their `cause` flattened to the underlying root cause.

## [3.2.0]

### Added

- New `ChatSdk.getPersistentMenuItems(): Promise<Array<PersistentMenuItem>>` method and the `PersistentMenuItem` type. Calls `GET /chat/1.0/brand/{brandId}/channel/{channelId}/persistent-menu-items` using the SDK instance's `brandId`, `channelId`, and chat endpoint. Throws `ChatSDKError` on transport failure or when the response is not an array.
- Added optional `timeoutMs` option to `fetchJSON` and applied a 30s timeout to the `getTransactionToken` request; the request now aborts and throws when the timeout is exceeded.

### Changed

- When the maximum number of retries to establish a WebSocket connection is reached, a new **WebSocketConnectionError** is emitted. This error can be handled via the existing onError callback, allowing consumers to react to permanent connection failures.

### Fixed

- Fixed WebSocket reconnection status display by preventing CLOSE event from being forwarded during active reconnection attempts. The RECONNECTING event is now emitted only when actively reconnecting (`retryCount > 0 && retryCount < maxRetries`), allowing consumers to properly display reconnection status without interference from CLOSE events. When reconnection retries are exhausted (`retryCount >= maxRetries`), the CLOSE event is now correctly forwarded to allow proper error handling and display of error pages.

## [3.1.0]

### Changed

- Changed caching mechanism to store the entire transaction token response instead of just the token value, fixing potential data consistency errors.
- Custom field values are now limited to 1024 characters. Attempting to set a custom field with a value exceeding this limit will result in an error.

### Added

- Added `keyPrefix` parameter to `CacheStorage` constructor to allow optional key prefixing for cached items.

## [3.0.0]

### Changed

- [BREAKING] Updated the `createdAt` and `createdAtWithMilliseconds` properties of `ChatEvent` to use the `string` type instead of `Date`.
- ChatSDKError now contains original error as `cause` property for better error tracing.
- Updated error types to extend from `ChatSDKError` for consistency.
- Changed `Customer.setId` to always store the customer identity ID as a string by calling .toString() on the input value. This ensures consistent type handling for the id property.
- Expand `ChatSDKOptions` with:
  - `isThirdPartyCookiesSupported` - flag to set fallback authorization flow when Third Party cookies are blocked and `securedSession` is set to `SECURED_COOKIES`.
  - `onAuthorization` - callback on successful (or failed) authorization
  - `storage` - long term storage (eg. tokens), it can use `localStorage` directly, `null` to disable

## [2.3.0]

### Added

- Introduced `requestMetadata` option in `ChatSDKOptions` to allow passing custom metadata with each request. This can be used for tracking or debugging purposes.
- Add `getChannelInfo` and `getChannelAvailability` functions to retrieve channel information and availability status without requiring a SDK instance.
- Add `NetworkRequestMetadata` type export to provide a structured way to define request metadata.
- Deprecated the `generateAuthorizationToken` method due to internal handling of fetching additional message content. It is no longer necessary to handle additional message content manually.
- Changed the `MessageCreated` event to automatically download additional message content if necessary.

## [2.2.0]

### Changed

- Removed the static `init` method from `CustomerInstance` as it was redundant. Access to the customer instance for low-level SDK usage is now only available via the `getInstance` method. The recommended way to get the customer instance remains `sdk.getCustomer()`.

## [2.1.0]

### Changed

- Unify the response when a thread is not found. Both `recoverThreadData` and `recoverLivechatThreadData` now return `ThreadRecoverFailedError`
- Custom fields are not sent with every message, but only with the first one. Any subsequent updates via thread.setCustomField will be sent as separate events.
- Add the ability to remove custom fields before they are sent with the first message using `thread.removeCustomField(customFieldId)`.
- Added new `IpAddressBlockedError` that may be thrown when calling `connect()`. If an `onError` callback is registered, it can now receive `IpAddressBlockedError` to handle cases where the IP address is blocked.

## [2.0.0]

### Added

- Introduced a new `connect()` method instead of auto-connecting in the constructor. Replace deprecated `authorize` calls in-place.
- Implemented `resetSession()` to enable session resets.
- Introduced `cacheStorage` option to enable caching mechanisms. Use `CacheStorage` class or provide your own implementing `ICacheStorage` interface.
- Added `securedSession` option, set to appropriate type based on the Channel settings.

### Changed

- Restructured `ChatSDKOptions` for better environment handling.
- Improved token caching flow with optional usage for third-party tokens.
- Improved validation for `isRecoverSuccessPayload`.
- Disabled reconnection attempts on initial connection to avoid retries in case of authorization errors.
- Updated heartbeat mechanism to start only when the token is provided.
- Improved internal variable storage.
- Add authorization endpoint domain.

### Removed

- Removed `temporaryAttachmentsUpload` method in favor of `sendAttachments`.
- Removed static usage of the `Customer` class.

### Fixed

- Fixed transaction token URL construction.
- Fixed reconnection attempts logic to avoid retries on initial authorization failures.
- Fixed socket URL handling.
- Ignored missing `user` field when agent is typing.
- Optimized `setCustomField` to only send modified fields.
- Enhanced UUID generation fallback.
