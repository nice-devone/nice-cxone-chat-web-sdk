import { UpdateThreadEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/UpdateThread';
import { ThreadIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/thread/ThreadIdOnExternalPlatform';
import { ChatEventData } from '../event/ChatEvent';
import { EventPayloadData } from '../sockets/EventPayload';
export declare function createUpdateThreadPayloadData(threadIdOnExternalPlatform: ThreadIdOnExternalPlatform, threadName: string): EventPayloadData<UpdateThreadEventData>;
export declare function isUpdateThreadSuccess(response: ChatEventData): boolean;
