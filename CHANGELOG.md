# Changelog

## [2.0.0]

### Added
- Introduced a new `connect()` method instead of auto-connecting in the constructor. Replace deprecated `authorize` calls in-place.
- Implemented `resetSession()` to enable session resets.
- Introduced `cacheStorage` option to enable caching mechanisms. Use `CacheStorage` class or provide your own implemting `ICacheStorage` interface.
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
