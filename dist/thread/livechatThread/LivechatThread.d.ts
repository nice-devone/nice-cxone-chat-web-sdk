import { SendMessageEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/SendMessage';
import { ThreadRecoveredPostbackData } from '@brandembassy/ts-types-chat/dist/awsEvents/ThreadRecovered';
import { ThreadIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/thread/ThreadIdOnExternalPlatform';
import { IChatEventTarget } from '../../event/ChatEventTarget';
import { MessageSuccessEventData } from '../../message/MessageSuccessEventData';
import { WebSocketClient } from '../../sockets/WebSocketClient';
import { Thread } from '../Thread';
export declare class LivechatThread extends Thread {
    protected _isInitialized: boolean;
    protected _canSendMessage: boolean;
    constructor(idOnExternalPlatform: ThreadIdOnExternalPlatform, websocketClient: WebSocketClient, messageEmitter: IChatEventTarget, isAuthorizationEnabled?: boolean);
    /**
     *  Recover existing live chat
     */
    recover(): Promise<ThreadRecoveredPostbackData>;
    sendMessage(messageData: SendMessageEventData): Promise<MessageSuccessEventData>;
    /**
     * Start livechat
     * @param {string} [initialMessageText]
     */
    startChat(initialMessageText?: string): Promise<MessageSuccessEventData | void>;
    endChat(): Promise<void>;
    private _registerLivechatEventHandlers;
}
