import { VisitorInput } from '@brandembassy/ts-types-chat/dist/awsEvents/AwsInputEvent';
import { VisitorId } from '@brandembassy/ts-types-platform/dist/visitor/VisitorId';
export interface VisitorPayload {
    visitor: VisitorInput;
}
export declare function createVisitorPayload(visitorId: VisitorId): VisitorPayload;
