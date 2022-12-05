import { ConsumerAuthorizationSuccessPayloadData } from '@brandembassy/ts-types-chat/dist/authorization/ConsumerAuthorizationSuccessPayloadData';
import { IThread } from '@brandembassy/ts-types-chat/dist/post/thread/IThread';
import { ChannelId } from '@brandembassy/ts-types-platform/dist/channel/ChannelId';
import { ThreadIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/thread/ThreadIdOnExternalPlatform';
import { ChatSDKOptions } from './ChatSDKOptions';
import { Customer } from './customer/customer';
import { ChatEventData, ChatEventType } from './event/ChatEvent';
import { RemoveListenerFunction } from './event/ListenerFunction';
import { Thread, LivechatThread } from './thread';
export declare class ChatSdk {
    onError?: (error: Error) => void;
    private websocketClient;
    private customer;
    private _incomingChatEventMiddleware;
    private _messageEmitter;
    private isAuthorizationEnabled;
    isLivechat: boolean;
    channelId: ChannelId;
    constructor(options: ChatSDKOptions);
    onErrorHandler(error: unknown): void;
    /**
     * Send Authorization Event
     * @param authorizationCode
     * @param visitorId
     */
    authorize(authorizationCode?: string, visitorId?: string): Promise<ConsumerAuthorizationSuccessPayloadData>;
    private _sendRefreshTokenEvent;
    /**
     * Register handler to chat event
     *
     * @param type type of chat event
     * @param handler event handler
     * @returns function to unregister handler
     */
    onChatEvent(type: ChatEventType, handler: (event: CustomEvent<ChatEventData>) => void): RemoveListenerFunction;
    /**
     * Get Customer instance
     */
    getCustomer(): Customer | null;
    /**
     * Get Thread instance by id
     * @param id
     * @returns instance of thread based on channel settings
     */
    getThread(id: ThreadIdOnExternalPlatform): Thread | LivechatThread;
    /**
     * Get list of available threads
     * @async
     * @returns list of threads
     */
    getTheadList(): Promise<Array<IThread> | null>;
    /**
     * Setup Environment endpoints
     */
    private _initEnvironment;
    private _initWS;
}
