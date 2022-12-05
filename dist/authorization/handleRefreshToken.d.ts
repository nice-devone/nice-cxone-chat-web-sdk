import { AccessToken } from '@brandembassy/ts-types-chat/dist/authorization/AccessToken';
export declare function getIdealTimeInSecondsForIssueRefreshToken(accessTokenExpiresIn: number): number;
export declare function handleRefreshToken(accessToken: AccessToken, refreshTokenAction: () => Promise<void>): void;
