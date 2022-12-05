import { SendMessageEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/SendMessage';
import { WebSocketClient } from '../sockets/WebSocketClient';
import { MessageSuccessEventData } from './MessageSuccessEventData';
export declare const sendMessage: (messageData: SendMessageEventData, websocketClient: WebSocketClient | null) => Promise<MessageSuccessEventData>;
