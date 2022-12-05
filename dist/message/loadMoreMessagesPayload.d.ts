import { LoadMoreMessagesEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/LoadMoreMessages';
import { EventPayloadData } from '../sockets/EventPayload';
export declare const createLoadMoreMessagesPayloadData: (eventData: LoadMoreMessagesEventData) => EventPayloadData<LoadMoreMessagesEventData>;
