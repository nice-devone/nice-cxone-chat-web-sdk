import { CaseCreatedData } from '@brandembassy/ts-types-platform/dist/post/case/CaseCreatedEvent';
import { PushUpdateEventType } from '@brandembassy/ts-types-platform/dist/pushUpdate/PushUpdateEventType';
import { ChatEventData } from '../event/ChatEvent';
interface ContactCreatedChatEvent extends ChatEventData {
    data: CaseCreatedData;
    type: PushUpdateEventType.CASE_CREATED;
}
export declare function isContactCreatedEvent(event: ChatEventData): event is ContactCreatedChatEvent;
export {};
