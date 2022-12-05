import { WebSocketClientEvent as PushUpdatesWebSocketClientEvent } from '@brandembassy/push-updates-sdk';
import { CloseEvent } from '@brandembassy/reconnecting-websocket';
import { BrandId } from '@brandembassy/ts-types-platform/dist/brand/BrandId';
import { ChannelId } from '@brandembassy/ts-types-platform/dist/channel/ChannelId';
import { CustomerIdentityIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/endUser/EndUserIdentityId';
import { WebSocketClientError } from './WebSocketClientError';
export declare const WebSocketClientEvent: typeof PushUpdatesWebSocketClientEvent;
export interface WebSocketClientOptions {
    /**
     * host for websocket connection
     */
    host?: string;
    /**
     * common error handler
     */
    onError?: (error: WebSocketClientError) => void;
    /**
     * port for websocket connection
     */
    port?: string;
}
/**
 * Websocket client
 */
export declare class WebSocketClient {
    private brandId;
    private channelId;
    private customerId;
    private options?;
    private _connection;
    constructor(brandId: BrandId, channelId: ChannelId, customerId: CustomerIdentityIdOnExternalPlatform, options?: WebSocketClientOptions | undefined);
    /**
     * Connect websocket
     */
    connect(): void;
    /**
     * Disconnect websocket
     */
    disconnect(): void;
    /**
     * Reconnect websocket
     */
    reconnect(): void;
    /**
     * Send data to active connection
     * @param data
     */
    send(data: unknown): void;
    /**
     * Register event handler to websocket event
     * @param eventType websocket event
     * @param handlerCallback event handler
     */
    on(eventType: PushUpdatesWebSocketClientEvent, handlerCallback: (event: CustomEvent) => void): void;
    /**
     * Unregister event handler to websocket event
     * @param eventType websocket event
     * @param handlerCallback event handler
     */
    off(eventType: PushUpdatesWebSocketClientEvent, handlerCallback: (event: CustomEvent) => void): void;
    _errorHandler(type: string, closeEvent: CloseEvent | undefined): void;
}
