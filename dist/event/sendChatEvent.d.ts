import { EventPayloadData } from '../sockets/EventPayload';
import { WebSocketClient } from '../sockets/WebSocketClient';
import { ChatEventData } from './ChatEvent';
/**
 * Send chat event
 * @param {EventPayloadData} payloadData
 * @param {WebSocketClient} webSocketClient
 */
export declare function sendChatEvent<D>(payloadData: EventPayloadData<D>, webSocketClient: WebSocketClient | null): Promise<ChatEventData>;
