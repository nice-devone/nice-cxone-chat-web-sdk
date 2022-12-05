import { BrowserFingerprint, DeviceType } from '@brandembassy/ts-types-chat/dist/user/BrowserFingerprint';
export interface BrowserFingerprintOptions {
    country?: string | null;
    ip?: string | null;
    language?: string;
    location?: string | null;
}
export declare const getBrowserLanguage: () => string;
export declare const getBrowserLocation: () => string;
/**
 * Get Device type
 * @param {string} [deviceType]
 */
export declare function getDeviceType(deviceType?: string): DeviceType;
/**
 * Get Customer Browser fingerprint
 * @param {BrowserFingerprintOptions} [options]
 */
export declare const getBrowserFingerprint: (options?: BrowserFingerprintOptions) => BrowserFingerprint;
