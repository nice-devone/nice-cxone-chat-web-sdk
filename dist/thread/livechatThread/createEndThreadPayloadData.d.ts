import { EndContactEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/EndContact';
import { CaseId } from '@brandembassy/ts-types-platform/dist/post/case/CaseId';
import { ThreadIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/thread/ThreadIdOnExternalPlatform';
import { EventPayloadData } from '../../sockets/EventPayload';
export declare function createEndThreadPayloadData(threadIdOnExternalPlatform: ThreadIdOnExternalPlatform, contactId: CaseId): EventPayloadData<EndContactEventData>;
