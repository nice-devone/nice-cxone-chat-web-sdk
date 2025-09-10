# Changelog

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
