import { AwsChatWindowEventActionRoute } from '@brandembassy/ts-types-chat/dist/awsEvents/AwsChatWindowEvent';
import { AwsInputEventType } from '@brandembassy/ts-types-chat/dist/awsEvents/AwsEventType';
import { AwsInputEvent, AwsInputEventData, ConsumerIdentityInput, DestinationInput, VisitorInput } from '@brandembassy/ts-types-chat/dist/awsEvents/AwsInputEvent';
export declare type EventActionRoute = AwsChatWindowEventActionRoute;
export declare type EventPayload<D extends AwsInputEventData> = AwsInputEvent<AwsInputEventType, D>;
export interface Event<D extends AwsInputEventData> {
    action: EventActionRoute;
    eventId: string;
    payload: EventPayload<D>;
}
export interface EventPayloadData<D extends AwsInputEventData> {
    consumerIdentity?: ConsumerIdentityInput;
    data: D;
    destination?: DestinationInput;
    eventType: AwsInputEventType;
    visitor?: VisitorInput;
}
export declare function createEventPayload<D extends AwsInputEventData>(eventPayloadData: EventPayloadData<D>): EventPayload<D>;
export declare function createEvent<D extends AwsInputEventData>(payload: EventPayload<D>, eventId?: string, actionRoute?: EventActionRoute): Event<D>;
