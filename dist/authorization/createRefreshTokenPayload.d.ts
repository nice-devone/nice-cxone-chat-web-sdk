import { RefreshTokenData } from '@brandembassy/ts-types-chat/dist/awsEvents/RefreshToken';
import { EventPayloadData } from '../sockets/EventPayload';
export declare function createRefreshTokenPayload(token: string): EventPayloadData<RefreshTokenData>;
