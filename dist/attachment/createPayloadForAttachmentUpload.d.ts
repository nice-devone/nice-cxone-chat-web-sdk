export interface AttachmentPayload {
    mimeType: string;
    name: string;
    url: string;
}
export declare const createPayloadForAttachmentUpload: (file: File) => Promise<AttachmentPayload>;
