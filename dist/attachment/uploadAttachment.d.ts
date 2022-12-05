import { BrandId } from '@brandembassy/ts-types-platform/dist/brand/BrandId';
import { AttachmentPayload } from './createPayloadForAttachmentUpload';
export interface UploadSuccessResponse {
    fileUrl: string;
}
export interface UploadFailResponse {
    allowedFileSize: string;
    allowedFileTypes: Array<{
        description: string;
        mimeType: string;
    }>;
}
export declare function isUploadSuccessResponse(data: unknown): data is UploadSuccessResponse;
export declare function isUploadFailResponse(data: unknown): data is UploadFailResponse;
export declare function uploadAttachment(brandId: BrandId, channelId: string, attachment: AttachmentPayload): Promise<UploadSuccessResponse | UploadFailResponse>;
