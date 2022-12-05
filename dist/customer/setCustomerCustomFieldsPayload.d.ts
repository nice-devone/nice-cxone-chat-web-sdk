import { SendConsumerCustomFieldsEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/SendConsumerCustomFields';
import { CustomFields } from '../customField/CustomFields';
import { EventPayloadData } from '../sockets/EventPayload';
declare type SendCustomerCustomFieldsEventData = SendConsumerCustomFieldsEventData;
export declare function createSetCustomerCustomFieldsPayloadData(customFields: CustomFields): EventPayloadData<SendCustomerCustomFieldsEventData>;
export {};
