import { CustomerIdentityIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/endUser/EndUserIdentityId';
import { CustomFields } from '../customField/CustomFields';
import { ChatEventData } from '../event/ChatEvent';
import { WebSocketClient } from '../sockets/WebSocketClient';
export declare class Customer {
    websocketClient: WebSocketClient | null;
    constructor(id: CustomerIdentityIdOnExternalPlatform, name: string | undefined, websocketClient: WebSocketClient | null);
    static setId(id: CustomerIdentityIdOnExternalPlatform): void;
    static getId(): CustomerIdentityIdOnExternalPlatform | null;
    static getName(): string | undefined;
    static setName(name?: string): void;
    static getIdOrCreateNewOne(): CustomerIdentityIdOnExternalPlatform;
    getId(): CustomerIdentityIdOnExternalPlatform;
    getName(): string | undefined;
    setName(name?: string): void;
    /**
     * Set Customer Custom fields
     * @param customFields custom fields object
     * @example { indentName: 'value' }
     */
    setCustomFields(customFields: CustomFields): Promise<ChatEventData>;
    /**
     * Set Customer Custom field
     * @param name Custom field name
     * @param value Custom field value
     */
    setCustomField(name: string, value: string): Promise<ChatEventData>;
}
