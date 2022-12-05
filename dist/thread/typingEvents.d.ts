import { SenderTypingEndedEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/SenderTypingEnded';
import { SenderTypingStartedEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/SenderTypingStarted';
import { ThreadIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/thread/ThreadIdOnExternalPlatform';
import { EventPayloadData } from '../sockets/EventPayload';
export declare function createStartTypingEventPayloadData(threadIdOnExternalPlatform: ThreadIdOnExternalPlatform): EventPayloadData<SenderTypingStartedEventData>;
export declare function createStopTypingEventPayloadData(threadIdOnExternalPlatform: ThreadIdOnExternalPlatform): EventPayloadData<SenderTypingEndedEventData>;
