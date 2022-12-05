import { MessageCreatedData } from '@brandembassy/ts-types-platform/dist/message/MessageCreatedEvent';
import { PushUpdateEventType } from '@brandembassy/ts-types-platform/dist/pushUpdate/PushUpdateEventType';
import { ChatEventData } from '../event/ChatEvent';
export interface MessageCreatedEvent extends ChatEventData {
    data: MessageCreatedData;
    type: PushUpdateEventType.MESSAGE_CREATED;
}
export declare function isMessageCreatedEvent(event: unknown): event is MessageCreatedEvent;
