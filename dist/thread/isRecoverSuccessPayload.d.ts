import { ThreadRecoveredPostbackData } from '@brandembassy/ts-types-chat/dist/awsEvents/ThreadRecovered';
import { ChatEventData } from '../event/ChatEvent';
interface ThreadRecoveredChatEvent extends ChatEventData {
    data: ThreadRecoveredPostbackData;
}
export declare const isRecoverSuccessPayload: (response: ChatEventData) => response is ThreadRecoveredChatEvent;
export {};
