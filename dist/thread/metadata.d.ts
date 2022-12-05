import { ArchiveThreadEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/ArchiveThread';
import { ThreadIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/thread/ThreadIdOnExternalPlatform';
import { EventPayloadData } from '../sockets/EventPayload';
export declare function createLoadThreadMetadataEventPayloadData(threadIdOnExternalPlatform: ThreadIdOnExternalPlatform): EventPayloadData<ArchiveThreadEventData>;
