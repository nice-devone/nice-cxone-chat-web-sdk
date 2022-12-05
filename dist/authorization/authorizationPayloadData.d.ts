import { AuthorizeConsumerData } from '@brandembassy/ts-types-chat/dist/awsEvents/AuthorizeConsumer';
import { VisitorId } from '@brandembassy/ts-types-platform/dist/visitor/VisitorId';
import { EventPayloadData } from '../sockets/EventPayload';
declare type AuthorizeCustomerData = AuthorizeConsumerData;
export declare function createAuthorizationPayloadData(authorizationCode: string | null, visitorId?: VisitorId): EventPayloadData<AuthorizeCustomerData>;
export {};
