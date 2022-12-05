import { AwsResponseEventType } from '@brandembassy/ts-types-chat/dist/awsEvents/AwsEventType';
import { ThreadMetadataLoadedPostbackData } from '@brandembassy/ts-types-chat/dist/awsEvents/ThreadMetadataLoaded';
import { ChatEventData } from '../event/ChatEvent';
export interface LoadThreadMetadataChatEvent extends ChatEventData {
    data: ThreadMetadataLoadedPostbackData;
    type: AwsResponseEventType.THREAD_METADATA_LOADED;
}
export declare const isLoadMetadataSuccessPayload: (response: ChatEventData) => response is LoadThreadMetadataChatEvent;
