import { SetConsumerContactCustomFieldsEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/SetConsumerContactCustomFields';
import { ThreadIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/thread/ThreadIdOnExternalPlatform';
import { CustomFields } from '../customField/CustomFields';
import { EventPayloadData } from '../sockets/EventPayload';
export declare function createSetThreadCustomFieldsPayloadData(customFields: CustomFields, threadIdOnExternalPlatform: ThreadIdOnExternalPlatform): EventPayloadData<SetConsumerContactCustomFieldsEventData>;
