import { ChatEventData } from '../event/ChatEvent';
export interface MessageSuccessEventData extends ChatEventData {
    id: string;
}
export interface MessageFailedEventData extends MessageSuccessEventData {
    error: {
        errorCode: string;
        errorMessage: string;
        transactionId: string;
    };
    id: string;
}
export declare function isSendMessageSuccessEventData(event: ChatEventData): event is MessageSuccessEventData;
