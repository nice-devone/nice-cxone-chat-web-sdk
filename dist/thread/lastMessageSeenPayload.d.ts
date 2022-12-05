import { MessageSeenByConsumerEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/MessageSeenByConsumer';
import { EventPayloadData } from '../sockets/EventPayload';
export declare function createLastMessageSeenPayloadData(threadIdOnExternalPlatform: string): EventPayloadData<MessageSeenByConsumerEventData>;
