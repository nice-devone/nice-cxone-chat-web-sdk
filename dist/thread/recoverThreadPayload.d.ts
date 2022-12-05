import { RecoverThreadEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/RecoverThread';
import { EventPayloadData } from '../sockets/EventPayload';
export declare function createRecoverThreadPayloadData(threadIdOnExternalPlatform: string): EventPayloadData<RecoverThreadEventData>;
