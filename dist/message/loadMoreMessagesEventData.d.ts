import { MoreMessagesLoadedPostbackData } from '@brandembassy/ts-types-chat/dist/awsEvents/MoreMessagesLoaded';
import { ChatEventData } from '../event/ChatEvent';
export interface MoreMessagesLoadedEvent extends ChatEventData {
    data: MoreMessagesLoadedPostbackData;
}
export declare function isLoadMoreMessagesEventData(event: ChatEventData): event is MoreMessagesLoadedEvent;
