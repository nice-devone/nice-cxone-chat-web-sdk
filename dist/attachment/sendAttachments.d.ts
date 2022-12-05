import { SendMessageEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/SendMessage';
import { Attachment } from '@brandembassy/ts-types-chat/dist/message/Attachment';
import { BrandId } from '@brandembassy/ts-types-platform/dist/brand/BrandId';
import { ChannelId } from '@brandembassy/ts-types-platform/dist/channel/ChannelId';
import { ThreadIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/thread/ThreadIdOnExternalPlatform';
import { SendMessageOptions } from '../thread/SendMessageOptions';
export declare const createAttachmentPayload: (file: File, brandId: BrandId, channelId: ChannelId) => Promise<Attachment>;
export declare const createAttachmentUploadMessageData: (files: FileList, threadIdOnExternalPlatform: ThreadIdOnExternalPlatform, options?: SendMessageOptions) => Promise<SendMessageEventData>;
