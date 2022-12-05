import { SendMessageEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/SendMessage';
import { ThreadRecoveredPostbackData } from '@brandembassy/ts-types-chat/dist/awsEvents/ThreadRecovered';
import { ThreadIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/thread/ThreadIdOnExternalPlatform';
import { UploadFailResponse } from '../attachment/uploadAttachment';
import { CustomFields } from '../customField/CustomFields';
import { ChatEventData, ChatEventType } from '../event/ChatEvent';
import { IChatEventTarget } from '../event/ChatEventTarget';
import { EventListenerFunction, RemoveListenerFunction } from '../event/ListenerFunction';
import { MoreMessagesLoadedEvent } from '../message/loadMoreMessagesEventData';
import { MessageSuccessEventData } from '../message/MessageSuccessEventData';
import { WebSocketClient } from '../sockets/WebSocketClient';
import { LoadThreadMetadataChatEvent } from './isLoadMetadataSuccessPayload';
import { SendMessageOptions } from './SendMessageOptions';
export declare class Thread {
    idOnExternalPlatform: ThreadIdOnExternalPlatform;
    protected _websocketClient: WebSocketClient;
    protected _exists: boolean;
    protected _messageEmitter: IChatEventTarget;
    protected _typingTimeoutID: ReturnType<typeof setTimeout> | undefined;
    protected _threadCustomFieldsQueue: CustomFields;
    protected _isAuthorizationEnabled: boolean;
    constructor(idOnExternalPlatform: ThreadIdOnExternalPlatform, websocketClient: WebSocketClient, messageEmitter: IChatEventTarget, isAuthorizationEnabled?: boolean);
    /**
     *  Recover existing chat
     */
    recover(): Promise<ThreadRecoveredPostbackData>;
    /**
     * Send message
     * @param messageData
     */
    sendMessage(messageData: SendMessageEventData): Promise<MessageSuccessEventData>;
    /**
     * Send text message
     * @param {string} messageText
     * @param {SendMessageOptions} [options]
     */
    sendTextMessage(messageText: string, options?: SendMessageOptions): Promise<MessageSuccessEventData>;
    /**
     * Load previous messages
     * @async
     * @return previous messages
     */
    loadMoreMessages(): Promise<MoreMessagesLoadedEvent | null>;
    /**
     * Mark all messages in the thread as seen
     */
    lastMessageSeen(): Promise<ChatEventData>;
    /**
     * Send attachment
     * @param {FileList} files - An object of this type is returned by the files' property of the HTML <input> element; this lets you access the list of files selected with the <input type="file"> element.
     * @param {SendMessageOptions} [options]
     * @description Raw function to send attachments
     * @return when upload failed UploadFailResponse contains allowed file size and file types
     */
    sendAttachments(files: FileList, options?: SendMessageOptions): Promise<MessageSuccessEventData | UploadFailResponse>;
    /**
     * Send start and stop typing events. It sends stop typing event after the timeout. Repeated calls resets this timeout.
     * @param timeout [timeout=1000] - The timeout in milliseconds.
     */
    keystroke(timeout?: number): void;
    /**
     * Manually send the stop typing event and clear the keystroke timeout.
     */
    stopTyping(): void;
    /**
     * Get Thread Metadata
     * @returns {LoadThreadMetadataChatEvent} response otherwise throw an error response
     */
    getMetadata(): Promise<LoadThreadMetadataChatEvent>;
    onThreadEvent(type: ChatEventType, handler: EventListenerFunction): RemoveListenerFunction;
    /**
     * Set thread custom fields
     * @param customFields custom fields object
     * @example { indentName: 'value' }
     */
    setCustomFields(customFields: CustomFields): Promise<void>;
    /**
     * Set thread custom field
     * @param name custom field name
     * @param value custom field value
     */
    setCustomField(name: string, value: string): Promise<void>;
    /**
     * Set thread as archived
     * @returns {true} if success otherwise throw error response
     */
    archive(): Promise<true>;
    /**
     * Set thread name
     * @param name New name of the Thread
     * @returns {true} if success otherwise throw an error response
     */
    setName(name: string): Promise<true>;
    private _registerEventHandlers;
}
