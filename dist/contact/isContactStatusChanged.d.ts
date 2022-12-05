import { CaseStatusChangedData } from '@brandembassy/ts-types-platform/dist/post/case/CaseStatusChangedEvent';
import { PushUpdateEventType } from '@brandembassy/ts-types-platform/dist/pushUpdate/PushUpdateEventType';
import { ChatEventData } from '../event/ChatEvent';
interface ContactStatusChangedEvent extends ChatEventData {
    data: CaseStatusChangedData;
    type: PushUpdateEventType.CASE_STATUS_CHANGED;
}
export declare function isContactStatusChangedEvent(event: ChatEventData): event is ContactStatusChangedEvent;
export {};
