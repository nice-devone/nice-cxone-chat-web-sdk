import { BrowserFingerprint } from '@brandembassy/ts-types-chat/dist/user/BrowserFingerprint';
import { MessageId } from '@brandembassy/ts-types-platform/dist/message/MessageId';
import { CustomFields } from '../customField/CustomFields';
export interface SendMessageOptions {
    browserFingerprint?: BrowserFingerprint;
    messageId?: MessageId;
    threadCustomFields?: CustomFields;
}
