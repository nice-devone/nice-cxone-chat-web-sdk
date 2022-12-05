import { SendMessageEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/SendMessage';
import { EventPayloadData } from '../sockets/EventPayload';
export declare const createSendMessagePayloadData: (eventData: SendMessageEventData) => EventPayloadData<SendMessageEventData>;
