import { BrandId } from '@brandembassy/ts-types-platform/dist/brand/BrandId';
import { ChannelId } from '@brandembassy/ts-types-platform/dist/channel/ChannelId';
import { CustomerIdentityIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/endUser/EndUserIdentityId';
import { EnvironmentEndpoints, EnvironmentName } from './env/Environments';
export interface ChatSDKOptions {
    authorizationCode?: string;
    brandId: BrandId;
    channelId: ChannelId;
    customEnvironment?: EnvironmentEndpoints;
    customerId: CustomerIdentityIdOnExternalPlatform;
    customerName?: string;
    environment: EnvironmentName;
    onError?: (error: Error) => void;
}
