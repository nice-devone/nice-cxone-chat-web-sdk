import { AwsInputEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/AwsInputEvent';
import { ChatEventData } from '../event/ChatEvent';
import { Event } from '../sockets/EventPayload';
import { WebSocketClient } from '../sockets/WebSocketClient';
export declare const makeRequest: (event: Event<AwsInputEventData>, wsClient: WebSocketClient | null) => Promise<ChatEventData>;
