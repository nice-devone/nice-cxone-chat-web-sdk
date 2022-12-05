import { ConsumerAuthorizationSuccessPayloadData } from '@brandembassy/ts-types-chat/dist/authorization/ConsumerAuthorizationSuccessPayloadData';
import { AwsResponseEventType } from '@brandembassy/ts-types-chat/dist/awsEvents/AwsEventType';
import { ChatEventData } from '../event/ChatEvent';
interface AuthorizeConsumerEventSuccessResponseData extends ConsumerAuthorizationSuccessPayloadData {
    status: 'success';
}
export interface AuthorizeConsumerEventSuccessResponse extends ChatEventData {
    data: AuthorizeConsumerEventSuccessResponseData;
    type: AwsResponseEventType.CONSUMER_AUTHORIZED;
}
export {};
