import { SendMessageEventData } from '@brandembassy/ts-types-chat/dist/awsEvents/SendMessage';
import { CustomField } from '@brandembassy/ts-types-chat/dist/customField/CustomField';
import { BrowserFingerprint } from '@brandembassy/ts-types-chat/dist/user/BrowserFingerprint';
import { MessageId } from '@brandembassy/ts-types-platform/dist/message/MessageId';
import { ThreadIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/thread/ThreadIdOnExternalPlatform';
export declare const createTextMessageData: (messageText: string, messageId: MessageId, threadIdOnExternalPlatform: ThreadIdOnExternalPlatform, threadCustomFields?: Array<CustomField>, customerCustomFields?: Array<CustomField>, browserFingerprint?: BrowserFingerprint) => SendMessageEventData;
