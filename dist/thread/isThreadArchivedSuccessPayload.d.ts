import { AwsResponseEventType } from '@brandembassy/ts-types-chat/dist/awsEvents/AwsEventType';
import { ChatEventData } from '../event/ChatEvent';
export interface ThreadArchivedEvent extends ChatEventData {
    type: AwsResponseEventType.THREAD_ARCHIVED;
}
export declare function isThreadArchivedSuccessPayload(response: ChatEventData): response is ThreadArchivedEvent;
