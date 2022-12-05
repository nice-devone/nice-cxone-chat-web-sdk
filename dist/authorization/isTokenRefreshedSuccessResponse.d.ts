import { AwsResponseEventType } from '@brandembassy/ts-types-chat/dist/awsEvents/AwsEventType';
import { TokenRefreshedPostbackData } from '@brandembassy/ts-types-chat/dist/awsEvents/TokenRefreshed';
export interface TokenRefreshedSuccessResponse {
    data: TokenRefreshedPostbackData;
    type: AwsResponseEventType.TOKEN_REFRESHED;
}
export declare function isTokenRefreshedSuccessResponse(response: unknown): response is TokenRefreshedSuccessResponse;
