import { ConsumerIdentityInput } from '@brandembassy/ts-types-chat/dist/awsEvents/AwsInputEvent';
export declare type ConsumerIdentityPayload = ConsumerIdentityInput;
export declare function createCustomerIdentityPayload(name?: string): ConsumerIdentityPayload;
