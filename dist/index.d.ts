import { v4 as generateId } from 'uuid';
import * as yup from 'yup';

declare type AccessToken = {
    token: string;
    expiresIn: number;
};

declare type Agent = {
    id: UserId;
    image: string;
    publicImage: string | null;
    name: string;
    online: boolean;
    uri: string;
};

declare enum ApplicationType {
    BROWSER = "browser"
}

export declare type AssignedAgentChangedData = yup.InferType<typeof caseInboxAssigneeChangedEventDataSchema> & {
    brand: Brand;
    case: Case;
    channel: Channel;
    inboxAssignee: User | null;
    previousInboxAssignee: User | null;
    routingQueue: RoutingQueue | null;
};

export declare type AssignedAgentChangedEvent = yup.InferType<typeof caseInboxAssigneeChangedEventSchema> & PushUpdateEventFields & {
    eventObject: PushUpdateEventObject.CASE;
    eventType: PushUpdateEventType.CASE_INBOX_ASSIGNEE_CHANGED;
    data: AssignedAgentChangedData;
};

declare interface Attachment {
    url: string;
    friendlyName: string;
}

declare type Attachment_2 = Override<yup.InferType<typeof attachmentSchema>, {
    id: AttachmentId;
}>;

declare type AttachmentId = Flavor<string, 'AttachmentId'>;

declare const attachmentSchema: yup.ObjectSchema<{
    friendlyName: string;
    securedPermanentUrl: string;
    url: string;
    mimeType: string;
    previewUrl: string | null;
    isInline: boolean;
    canBeStored: boolean;
    id: string | undefined;
}>;

declare type Author = {
    id: CustomerIdentityIdOnExternalPlatform;
    name: string;
    nickname: string;
    image?: string;
    customFields?: Array<CustomField>;
};

declare interface AuthorizeConsumerEventSuccessResponse extends ChatEventData {
    data: AuthorizeConsumerEventSuccessResponseData;
    type: AwsResponseEventType.CONSUMER_AUTHORIZED;
}

declare interface AuthorizeConsumerEventSuccessResponseData extends ConsumerAuthorizationSuccessPayloadData {
    status: 'success';
}

declare interface AwsInputEventData {
}

declare interface AwsResponseEventPostbackData {
}

declare enum AwsResponseEventType {
    LIVECHAT_RECOVERED = "LivechatRecovered",
    MORE_MESSAGES_LOADED = "MoreMessagesLoaded",
    OFFLINE_MESSAGE_SENT = "OfflineMessageSent",
    THREAD_LIST_FETCHED = "ThreadListFetched",
    THREAD_RECOVERED = "ThreadRecovered",
    TRANSCRIPT_SENT = "TranscriptSent",
    CONSUMER_AUTHORIZED = "ConsumerAuthorized",
    THREAD_METADATA_LOADED = "ThreadMetadataLoaded",
    SET_POSITION_IN_QUEUE = "SetPositionInQueue",
    GROUP_CHAT_INVITE_CREATED = "InvitationToGroupChatCreated",
    GROUP_CHAT_INVITE_SENT = "EmailInvitationToGroupChatSent",
    GROUP_CHAT_JOINED = "GroupChatJoined",
    TOKEN_REFRESHED = "TokenRefreshed",
    AUTHORIZATION_TOKEN_GENERATED = "AuthorizationTokenGenerated",
    THREAD_ARCHIVED = "ThreadArchived"
}

declare interface BasicChannelInfo {
    availability: {
        status: ChannelAvailability;
    };
    settings: {
        isLivechat: boolean;
        hasMultipleThreadsPerCustomer: boolean;
        isAuthorizationEnabled: boolean;
    };
}

declare type Brand = yup.InferType<typeof brandSchema> & {
    id: BrandId;
};

export declare type BrandId = Flavor<number, 'BrandId'>;

declare const brandSchema: yup.ObjectSchema<{
    id: number;
    tenantId: string | null;
    businessUnitId: number | null;
}>;

declare type BrowserFingerprint = {
    browser: string | null;
    browserVersion: string | null;
    country: string | null;
    ip: string | null;
    language: string;
    location: string | null;
    os: string | null;
    osVersion: string | null;
    deviceToken?: string | null;
    deviceType: DeviceType | null;
    applicationType: ApplicationType | null;
};

declare type Case = yup.InferType<typeof caseSchema> & {
    id: CaseId;
    threadId: ThreadId;
    threadIdOnExternalPlatform: ThreadIdOnExternalPlatform;
    status: CaseStatus;
    routingQueueId?: RoutingQueueId;
    authorEndUserIdentity?: EndUserIdentity;
    statistics: Statistics;
    inboxAssigneeUser?: User | null;
    inboxPreAssigneeUser?: User | null;
    ownerAssigneeUser?: User | null;
};

declare type CaseCreatedData = yup.InferType<typeof caseCreatedEventDataSchema> & {
    brand: Brand;
    case: Case;
    channel: Channel;
    thread: Thread_2;
};

declare const caseCreatedEventDataSchema: yup.ObjectSchema<{
    brand: object & {
        id: any;
        tenantId: any;
        businessUnitId: any;
    };
    case: object & {
        id: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        status: any;
        direction: any;
        routingQueueId: any;
        routingQueuePriority: any;
        inboxAssignee: any;
        inboxAssigneeUser: any;
        inboxPreAssigneeUser: any;
        ownerAssignee: any;
        ownerAssigneeUser: any;
        endUserRecipients: any;
        detailUrl: any;
        authorEndUserIdentity: any;
        statistics: any;
        recipientsCustomers: any;
        recipients: any;
    };
    channel: object & {
        id: any;
        name: any;
        integrationBoxIdentifier: any;
        idOnExternalPlatform: any;
        realExternalPlatformId: any;
        externalPlatformAvatar: any;
        canAgentInviteCustomersToContact: any;
        canReplyToAnyMessage: any;
        canSaveResponse: any;
        contentFormat: any;
        externalPlatformIcon: any;
        hasAbilityToDelete: any;
        hasAbilityToForwardMessage: any;
        hasAbilityToHide: any;
        hasAbilityToChangeFrom: any;
        hasAbilityToChangeRecipient: any;
        hasAbilityToLike: any;
        hasAbilityToQuoteMessage: any;
        hasAbilityToSendFiles: any;
        hasAbilityToShare: any;
        hasAbilityToTag: any;
        hasCcAndBcc: any;
        hasCustomerOnThirdParty: any;
        hasEditableTitle: any;
        hasMultipleRecipient: any;
        hasMultipleThreadsPerEndUser: any;
        hasOutboundFlow: any;
        hasOutboundTemplates: any;
        hasPostAsPlaceholder: any;
        hasPublishing: any;
        hasReply: any;
        hasTreeStructure: any;
        hasVisibleRecipients: any;
        hasVisibleTitle: any;
        channelIntegrationId: any;
        isAutomaticSignatureAttached: any;
        isCaseBasedStorage: any;
        isHidden: any;
        isDeleted: any;
        isLiveChat: any;
        isPostWritable: any;
        isPrivate: any;
        mediaType: any;
        nicknameOnExternalPlatform: any;
        ownerUserId: any;
        replyPrefixMentionTemplate: any;
        studioScript: any;
        translationGroup: any;
        wysiwygEnabled: any;
    };
    thread: object & {
        id: any;
        idOnExternalPlatform: any;
        threadName: any;
    };
}>;

declare type CaseId = ContactNumber;

declare const caseInboxAssigneeChangedEventDataSchema: yup.ObjectSchema<{
    acceptRejectFlow: {
        isEnabled: any;
        refusalTimeoutSeconds: any;
        isTransfer: any;
    } | null;
    brand: object & {
        id: any;
        tenantId: any;
        businessUnitId: any;
    };
    case: object & {
        id: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        status: any;
        direction: any;
        routingQueueId: any;
        routingQueuePriority: any;
        inboxAssignee: any;
        inboxAssigneeUser: any;
        inboxPreAssigneeUser: any;
        ownerAssignee: any;
        ownerAssigneeUser: any;
        endUserRecipients: any;
        detailUrl: any;
        authorEndUserIdentity: any;
        statistics: any;
        recipientsCustomers: any;
        recipients: any;
    };
    channel: object & {
        id: any;
        name: any;
        integrationBoxIdentifier: any;
        idOnExternalPlatform: any;
        realExternalPlatformId: any;
        externalPlatformAvatar: any;
        canAgentInviteCustomersToContact: any;
        canReplyToAnyMessage: any;
        canSaveResponse: any;
        contentFormat: any;
        externalPlatformIcon: any;
        hasAbilityToDelete: any;
        hasAbilityToForwardMessage: any;
        hasAbilityToHide: any;
        hasAbilityToChangeFrom: any;
        hasAbilityToChangeRecipient: any;
        hasAbilityToLike: any;
        hasAbilityToQuoteMessage: any;
        hasAbilityToSendFiles: any;
        hasAbilityToShare: any;
        hasAbilityToTag: any;
        hasCcAndBcc: any;
        hasCustomerOnThirdParty: any;
        hasEditableTitle: any;
        hasMultipleRecipient: any;
        hasMultipleThreadsPerEndUser: any;
        hasOutboundFlow: any;
        hasOutboundTemplates: any;
        hasPostAsPlaceholder: any;
        hasPublishing: any;
        hasReply: any;
        hasTreeStructure: any;
        hasVisibleRecipients: any;
        hasVisibleTitle: any;
        channelIntegrationId: any;
        isAutomaticSignatureAttached: any;
        isCaseBasedStorage: any;
        isHidden: any;
        isDeleted: any;
        isLiveChat: any;
        isPostWritable: any;
        isPrivate: any;
        mediaType: any;
        nicknameOnExternalPlatform: any;
        ownerUserId: any;
        replyPrefixMentionTemplate: any;
        studioScript: any;
        translationGroup: any;
        wysiwygEnabled: any;
    };
    inboxAssignee: object & {
        id: any;
        incontactId: any;
        emailAddress: any;
        loginUsername: any;
        firstName: any;
        surname: any;
        nickname: any;
        isBotUser: any;
        isSurveyUser: any;
        imageUrl: any;
        publicImageUrl: any;
    };
    previousInboxAssignee: (object & {
        id: any;
        incontactId: any;
        emailAddress: any;
        loginUsername: any;
        firstName: any;
        surname: any;
        nickname: any;
        isBotUser: any;
        isSurveyUser: any;
        imageUrl: any;
        publicImageUrl: any;
    }) | null;
    routingQueue: object & {
        id: any;
        name: any;
        isSubqueue: any;
    };
}>;

declare const caseInboxAssigneeChangedEventSchema: yup.ObjectSchema<{
    data: object & {
        acceptRejectFlow: any;
        brand: any;
        case: any;
        channel: any;
        inboxAssignee: any;
        previousInboxAssignee: any;
        routingQueue: any;
    };
} & {
    eventId: string;
    eventObject: string;
    eventType: string;
    context: (object & {
        initiator: any;
    }) | null;
    createdAt: Date;
}>;

declare const caseSchema: yup.ObjectSchema<{
    id: string;
    threadId: string;
    threadIdOnExternalPlatform: string;
    status: string;
    direction: string;
    routingQueueId: string;
    routingQueuePriority: number;
    inboxAssignee: number;
    inboxAssigneeUser: (object & {
        id: any;
        incontactId: any;
        emailAddress: any;
        loginUsername: any;
        firstName: any;
        surname: any;
        nickname: any;
        isBotUser: any;
        isSurveyUser: any;
        imageUrl: any;
        publicImageUrl: any;
    }) | null;
    inboxPreAssigneeUser: (object & {
        id: any;
        incontactId: any;
        emailAddress: any;
        loginUsername: any;
        firstName: any;
        surname: any;
        nickname: any;
        isBotUser: any;
        isSurveyUser: any;
        imageUrl: any;
        publicImageUrl: any;
    }) | null;
    ownerAssignee: number;
    ownerAssigneeUser: (object & {
        id: any;
        incontactId: any;
        emailAddress: any;
        loginUsername: any;
        firstName: any;
        surname: any;
        nickname: any;
        isBotUser: any;
        isSurveyUser: any;
        imageUrl: any;
        publicImageUrl: any;
    }) | null;
    endUserRecipients: Recipient[];
    detailUrl: string;
    authorEndUserIdentity: object & {
        id: any;
        idOnExternalPlatform: any;
        fullName: any;
        firstName: any;
        lastName: any;
        nickname: any;
        image: any;
    };
    statistics: object & {
        inboxAssigneeResponseTime: any;
    };
    recipientsCustomers: {
        fullName: any;
        firstName: any;
        surname: any;
        id: any;
        image: any;
        customFields: any;
    }[];
    recipients: Recipient[];
}>;

declare enum CaseStatus {
    NEW = "new",
    OPEN = "open",
    PENDING = "pending",
    ESCALATED = "escalated",
    RESOLVED = "resolved",
    CLOSED = "closed",
    TRASHED = "trashed"
}

declare type CaseStatusChangedData = yup.InferType<typeof caseStatusChangedEventDataSchema> & {
    brand: Brand;
    case: Case;
    channel: Channel;
};

declare const caseStatusChangedEventDataSchema: yup.ObjectSchema<{
    brand: object & {
        id: any;
        tenantId: any;
        businessUnitId: any;
    };
    case: object & {
        id: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        status: any;
        direction: any;
        routingQueueId: any;
        routingQueuePriority: any;
        inboxAssignee: any;
        inboxAssigneeUser: any;
        inboxPreAssigneeUser: any;
        ownerAssignee: any;
        ownerAssigneeUser: any;
        endUserRecipients: any;
        detailUrl: any;
        authorEndUserIdentity: any;
        statistics: any;
        recipientsCustomers: any;
        recipients: any;
    };
    channel: object & {
        id: any;
        name: any;
        integrationBoxIdentifier: any;
        idOnExternalPlatform: any;
        realExternalPlatformId: any;
        externalPlatformAvatar: any;
        canAgentInviteCustomersToContact: any;
        canReplyToAnyMessage: any;
        canSaveResponse: any;
        contentFormat: any;
        externalPlatformIcon: any;
        hasAbilityToDelete: any;
        hasAbilityToForwardMessage: any;
        hasAbilityToHide: any;
        hasAbilityToChangeFrom: any;
        hasAbilityToChangeRecipient: any;
        hasAbilityToLike: any;
        hasAbilityToQuoteMessage: any;
        hasAbilityToSendFiles: any;
        hasAbilityToShare: any;
        hasAbilityToTag: any;
        hasCcAndBcc: any;
        hasCustomerOnThirdParty: any;
        hasEditableTitle: any;
        hasMultipleRecipient: any;
        hasMultipleThreadsPerEndUser: any;
        hasOutboundFlow: any;
        hasOutboundTemplates: any;
        hasPostAsPlaceholder: any;
        hasPublishing: any;
        hasReply: any;
        hasTreeStructure: any;
        hasVisibleRecipients: any;
        hasVisibleTitle: any;
        channelIntegrationId: any;
        isAutomaticSignatureAttached: any;
        isCaseBasedStorage: any;
        isHidden: any;
        isDeleted: any;
        isLiveChat: any;
        isPostWritable: any;
        isPrivate: any;
        mediaType: any;
        nicknameOnExternalPlatform: any;
        ownerUserId: any;
        replyPrefixMentionTemplate: any;
        studioScript: any;
        translationGroup: any;
        wysiwygEnabled: any;
    };
}>;

declare type Channel = yup.InferType<typeof channelSchema> & {
    id: ChannelId;
    idOnExternalPlatform: ChannelIdOnExternalPlatform;
};

declare enum ChannelAvailability {
    ONLINE = "online",
    OFFLINE = "offline"
}

export declare type ChannelId = Flavor<string, 'ChannelId'>;

declare type ChannelIdOnExternalPlatform = Flavor<string, 'ChannelIdOnExternalPlatform'>;

declare const channelSchema: yup.ObjectSchema<{
    id: string;
    name: string;
    integrationBoxIdentifier: string;
    idOnExternalPlatform: string;
    realExternalPlatformId: string;
    externalPlatformAvatar: string;
    canAgentInviteCustomersToContact: boolean;
    canReplyToAnyMessage: boolean;
    canSaveResponse: boolean;
    contentFormat: string;
    externalPlatformIcon: string;
    hasAbilityToDelete: boolean;
    hasAbilityToForwardMessage: boolean;
    hasAbilityToHide: boolean;
    hasAbilityToChangeFrom: boolean;
    hasAbilityToChangeRecipient: boolean;
    hasAbilityToLike: boolean;
    hasAbilityToQuoteMessage: boolean;
    hasAbilityToSendFiles: boolean;
    hasAbilityToShare: boolean;
    hasAbilityToTag: boolean;
    hasCcAndBcc: boolean;
    hasCustomerOnThirdParty: boolean;
    hasEditableTitle: boolean;
    hasMultipleRecipient: boolean;
    hasMultipleThreadsPerEndUser: boolean;
    hasOutboundFlow: boolean;
    hasOutboundTemplates: boolean;
    hasPostAsPlaceholder: boolean;
    hasPublishing: boolean;
    hasReply: boolean;
    hasTreeStructure: boolean;
    hasVisibleRecipients: boolean;
    hasVisibleTitle: boolean;
    channelIntegrationId: string;
    isAutomaticSignatureAttached: boolean;
    isCaseBasedStorage: boolean;
    isHidden: boolean;
    isDeleted: boolean;
    isLiveChat: boolean;
    isPostWritable: boolean;
    isPrivate: boolean;
    mediaType: number | undefined;
    nicknameOnExternalPlatform: string;
    ownerUserId: number;
    replyPrefixMentionTemplate: string;
    studioScript: string | null;
    translationGroup: string;
    wysiwygEnabled: boolean;
}>;

export declare const ChatEvent: {
    readonly AGENT_TYPING_STARTED: "AgentTypingStarted";
    readonly AGENT_TYPING_ENDED: "AgentTypingEnded";
    readonly ASSIGNED_AGENT_CHANGED: "AssignedAgentChanged";
    readonly LIVECHAT_RECOVERED: AwsResponseEventType.LIVECHAT_RECOVERED;
    readonly MORE_MESSAGES_LOADED: AwsResponseEventType.MORE_MESSAGES_LOADED;
    readonly OFFLINE_MESSAGE_SENT: AwsResponseEventType.OFFLINE_MESSAGE_SENT;
    readonly THREAD_LIST_FETCHED: AwsResponseEventType.THREAD_LIST_FETCHED;
    readonly THREAD_RECOVERED: AwsResponseEventType.THREAD_RECOVERED;
    readonly TRANSCRIPT_SENT: AwsResponseEventType.TRANSCRIPT_SENT;
    readonly CONSUMER_AUTHORIZED: AwsResponseEventType.CONSUMER_AUTHORIZED;
    readonly THREAD_METADATA_LOADED: AwsResponseEventType.THREAD_METADATA_LOADED;
    readonly SET_POSITION_IN_QUEUE: AwsResponseEventType.SET_POSITION_IN_QUEUE;
    readonly GROUP_CHAT_INVITE_CREATED: AwsResponseEventType.GROUP_CHAT_INVITE_CREATED;
    readonly GROUP_CHAT_INVITE_SENT: AwsResponseEventType.GROUP_CHAT_INVITE_SENT;
    readonly GROUP_CHAT_JOINED: AwsResponseEventType.GROUP_CHAT_JOINED;
    readonly TOKEN_REFRESHED: AwsResponseEventType.TOKEN_REFRESHED;
    readonly AUTHORIZATION_TOKEN_GENERATED: AwsResponseEventType.AUTHORIZATION_TOKEN_GENERATED;
    readonly THREAD_ARCHIVED: AwsResponseEventType.THREAD_ARCHIVED;
    readonly AUTHORIZE_CONSUMER: PushUpdateEventType.AUTHORIZE_CONSUMER;
    readonly CASE_CREATED: PushUpdateEventType.CASE_CREATED;
    readonly CASE_INBOX_ASSIGNEE_CHANGED: PushUpdateEventType.CASE_INBOX_ASSIGNEE_CHANGED;
    readonly CASE_STATUS_CHANGED: PushUpdateEventType.CASE_STATUS_CHANGED;
    readonly CASE_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED: PushUpdateEventType.CASE_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED;
    readonly CHANNEL_CREATED: PushUpdateEventType.CHANNEL_CREATED;
    readonly CHANNEL_DELETED: PushUpdateEventType.CHANNEL_DELETED;
    readonly CHANNEL_UPDATED: PushUpdateEventType.CHANNEL_UPDATED;
    readonly MESSAGE_ADDED_INTO_CASE: PushUpdateEventType.MESSAGE_ADDED_INTO_CASE;
    readonly MESSAGE_CREATED: PushUpdateEventType.MESSAGE_CREATED;
    readonly MESSAGE_DELIVERED_TO_END_USER: PushUpdateEventType.MESSAGE_DELIVERED_TO_END_USER;
    readonly MESSAGE_DELIVERED_TO_USER: PushUpdateEventType.MESSAGE_DELIVERED_TO_USER;
    readonly MESSAGE_NOTE_CREATED: PushUpdateEventType.MESSAGE_NOTE_CREATED;
    readonly MESSAGE_NOTE_UPDATED: PushUpdateEventType.MESSAGE_NOTE_UPDATED;
    readonly MESSAGE_NOTE_DELETED: PushUpdateEventType.MESSAGE_NOTE_DELETED;
    readonly MESSAGE_READ_CHANGED: PushUpdateEventType.MESSAGE_READ_CHANGED;
    readonly MESSAGE_SEEN_BY_END_USER: PushUpdateEventType.MESSAGE_SEEN_BY_END_USER;
    readonly MESSAGE_SEEN_BY_USER: PushUpdateEventType.MESSAGE_SEEN_BY_USER;
    readonly MESSAGE_UPDATED: PushUpdateEventType.MESSAGE_UPDATED;
    readonly PAGE_VIEW_CREATED: PushUpdateEventType.PAGE_VIEW_CREATED;
    readonly ROUTING_QUEUE_CREATED: PushUpdateEventType.ROUTING_QUEUE_CREATED;
    readonly ROUTING_QUEUE_DELETED: PushUpdateEventType.ROUTING_QUEUE_DELETED;
    readonly ROUTING_QUEUE_UPDATED: PushUpdateEventType.ROUTING_QUEUE_UPDATED;
    readonly SUBQUEUE_ASSIGNED_TO_ROUTING_QUEUE: PushUpdateEventType.SUBQUEUE_ASSIGNED_TO_ROUTING_QUEUE;
    readonly SUBQUEUE_UNASSIGNED_TO_ROUTING_QUEUE: PushUpdateEventType.SUBQUEUE_UNASSIGNED_TO_ROUTING_QUEUE;
    readonly USER_ASSIGNED_TO_ROUTING_QUEUE: PushUpdateEventType.USER_ASSIGNED_TO_ROUTING_QUEUE;
    readonly USER_STATUS_CHANGED: PushUpdateEventType.USER_STATUS_CHANGED;
    readonly USER_UNASSIGNED_FROM_ROUTING_QUEUE: PushUpdateEventType.USER_UNASSIGNED_FROM_ROUTING_QUEUE;
    readonly AGENT_CONTACT_STARTED: PushUpdateEventType.AGENT_CONTACT_STARTED;
    readonly AGENT_CONTACT_ENDED: PushUpdateEventType.AGENT_CONTACT_ENDED;
    readonly SENDER_TYPING_STARTED: PushUpdateEventType.SENDER_TYPING_STARTED;
    readonly SENDER_TYPING_ENDED: PushUpdateEventType.SENDER_TYPING_ENDED;
    readonly FIRE_PROACTIVE: PushUpdateEventType.FIRE_PROACTIVE;
    readonly CONTACT_INBOX_PRE_ASSIGNEE_CHANGED: PushUpdateEventType.CONTACT_INBOX_PRE_ASSIGNEE_CHANGED;
    readonly CONTACT_RECIPIENTS_CHANGED: PushUpdateEventType.CONTACT_RECIPIENTS_CHANGED;
};

export declare interface ChatEventData {
    data: unknown;
    error?: MessageFailedEventData['error'];
    id: string;
    type?: ChatEventType;
}

declare type ChatEventKey = keyof typeof ChatEvent;

export declare type ChatEventType = typeof ChatEvent[ChatEventKey];

declare class ChatSdk {
    onError?: (error: Error) => void;
    private websocketClient;
    private customer;
    private _incomingChatEventMiddleware;
    private _messageEmitter;
    private isAuthorizationEnabled;
    isLivechat: boolean;
    channelId: ChannelId;
    constructor(options: ChatSDKOptions);
    onErrorHandler(error: unknown): void;
    /**
     * Send Authorization Event
     * @param authorizationCode
     * @param visitorId
     */
    authorize(authorizationCode?: string, visitorId?: string): Promise<ConsumerAuthorizationSuccessPayloadData>;
    private _sendRefreshTokenEvent;
    /**
     * Register handler to chat event
     *
     * @param type type of chat event
     * @param handler event handler
     * @returns function to unregister handler
     */
    onChatEvent(type: ChatEventType, handler: (event: CustomEvent<ChatEventData>) => void): RemoveListenerFunction;
    /**
     * Get Customer instance
     */
    getCustomer(): Customer_2 | null;
    /**
     * Get Thread instance by id
     * @param id
     * @returns instance of thread based on channel settings
     */
    getThread(id: ThreadIdOnExternalPlatform): Thread | LivechatThread;
    /**
     * Get list of available threads
     * @async
     * @returns list of threads
     */
    getTheadList(): Promise<Array<IThread> | null>;
    /**
     * Setup Environment endpoints
     */
    private _initEnvironment;
    private _initWS;
}
export { ChatSdk }
export default ChatSdk;

export declare interface ChatSDKOptions {
    authorizationCode?: string;
    brandId: BrandId;
    channelId: ChannelId;
    customEnvironment?: EnvironmentEndpoints;
    customerId: CustomerIdentityIdOnExternalPlatform;
    customerName?: string;
    environment: EnvironmentName;
    onError?: (error: Error) => void;
}

declare type CloseEvent_2 = Events.CloseEvent;

declare class CloseEvent_3 extends Event_2 {
    code: number;
    reason: string;
    wasClean: boolean;
    constructor(code: number | undefined, reason: string | undefined, target: any);
}

export declare interface ConsumerAuthorizationSuccessPayloadData {
    accessToken?: AccessToken;
    consumerIdentity: CustomerIdentity;
    channel?: BasicChannelInfo;
    contact?: {
        customFields: Array<CustomField>;
    };
    customer?: {
        customFields: Array<CustomField>;
    };
}

declare interface ConsumerContact {
    status: CaseStatus;
    createdAt: string;
    statusUpdatedAt: string;
    isOwn: boolean;
    sentiment: Sentiment;
    ownerAssignee: UserId;
    inboxAssignee: UserId;
    caseId: CaseId;
    postId: ThreadId;
    agentName: string;
    channelId: ChannelId;
    customer: {
        customerIdent: string;
        name: string;
        surname: string;
    };
    recipients: [{
        idOnExternalPlatform: string;
        isPrimary: boolean;
        isPrivate: boolean;
        name: string;
    }];
    customFields: Array<CustomField>;
}

declare interface ContactCreatedChatEvent extends ChatEventData {
    data: CaseCreatedData;
    type: PushUpdateEventType.CASE_CREATED;
}

declare type ContactNumber = Flavor<string, 'ContactNumber'>;

declare interface ContactStatusChangedEvent extends ChatEventData {
    data: CaseStatusChangedData;
    type: PushUpdateEventType.CASE_STATUS_CHANGED;
}

declare type ContentRemoved = yup.InferType<typeof contentRemovedSchema>;

declare const contentRemovedSchema: yup.ObjectSchema<{
    reason: string;
    removedAt: Date;
}>;

declare type Customer = yup.InferType<typeof customerSchema>;

declare class Customer_2 {
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

export declare interface CustomerIdentity {
    idOnExternalPlatform: CustomerIdentityIdOnExternalPlatform;
    firstName?: string;
    lastName?: string;
    image?: string;
}

export declare type CustomerIdentityIdOnExternalPlatform = Flavor<string, 'CustomerIdentityIdOnExternalPlatform'>;

declare const customerSchema: yup.ObjectSchema<{
    firstName: string;
    lastName: string;
    fullName: string;
    customFields: (object & {
        ident: any;
        value: any;
    })[];
}>;

declare type CustomField = {
    ident: string;
    value: string;
};

declare type CustomFields = Record<string, string>;

declare enum DeviceType {
    DESKTOP = "desktop",
    MOBILE = "mobile",
    OTHER = "other",
    TABLET = "tablet"
}

declare type EndUserIdentity = yup.InferType<typeof endUserIdentitySchema> & {
    id: EndUserIdentityId;
    idOnExternalPlatform: CustomerIdentityIdOnExternalPlatform;
};

declare type EndUserIdentityId = Flavor<string, 'EndUserIdentityId'>;

declare const endUserIdentitySchema: yup.ObjectSchema<{
    id: string;
    idOnExternalPlatform: string;
    fullName: string;
    firstName: string;
    lastName: string;
    nickname: string;
    image: string;
}>;

declare interface EnvironmentEndpoints {
    chat: string;
    gateway: string;
    name: string;
}

export declare enum EnvironmentName {
    AU1 = "AU1",
    CA1 = "CA1",
    EU1 = "EU1",
    JP1 = "JP1",
    NA1 = "NA1",
    UK1 = "UK1",
    custom = "custom"
}

declare class ErrorEvent_2 extends Event_2 {
    message: string;
    error: Error;
    constructor(error: Error, target: any);
}

declare class Event_2 {
    target: any;
    type: string;
    constructor(type: string, target: any);
}

declare type EventId = Flavor<string, 'eventId'>;

export declare type EventListenerFunction = (event: CustomEvent<ChatEventData>) => void;

declare namespace Events {
    export {
        Event_2 as Event,
        ErrorEvent_2 as ErrorEvent,
        CloseEvent_3 as CloseEvent,
        WebSocketEventMap_2 as WebSocketEventMap,
        WebSocketEventListenerMap
    }
}

declare type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;

declare interface Flavoring<FlavorT> {
    _type?: FlavorT;
}

export { generateId }

/**
 * Get message author name of given message
 * @param message
 * @returns message author name
 */
export declare const getAuthor: (message: Message) => string;

export declare interface IChatEventTarget extends EventTarget {
    addEventListener<K extends ChatEventType>(type: K, listener: (event: CustomEvent<ChatEventData>) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
    dispatchEvent(event: CustomEvent<ChatEventData>): boolean;
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener<K extends ChatEventType>(type: K, callback: (event: CustomEvent<ChatEventData>) => void, options?: boolean | EventListenerOptions | undefined): void;
}

declare type IdentityIdOnExternalPlatform = CustomerIdentityIdOnExternalPlatform | ChannelIdOnExternalPlatform;

declare type InboxAssigneeResponseTime = yup.InferType<typeof inboxAssigneeResponseTimeSchema>;

declare const inboxAssigneeResponseTimeSchema: yup.ObjectSchema<{
    valueInSeconds: number;
    slaInSeconds: number | null;
    slaEnabled: boolean;
    isRunning: boolean;
}>;

export declare const isAuthSuccessEvent: (payload: ChatEventData) => payload is AuthorizeConsumerEventSuccessResponse;

export declare function isContactCreatedEvent(event: ChatEventData): event is ContactCreatedChatEvent;

export declare function isContactStatusChangedEvent(event: ChatEventData): event is ContactStatusChangedEvent;

export declare const isLoadMetadataSuccessPayload: (response: ChatEventData) => response is LoadThreadMetadataChatEvent;

export declare function isMessage(item: unknown): item is Message;

export declare function isMessageCreatedEvent(event: unknown): event is MessageCreatedEvent;

export declare function isMoreMessagesLoadedEvent(event: ChatEventData): event is MoreMessagesLoadedEvent;

export declare const isRecoverSuccessEvent: (response: ChatEventData) => response is ThreadRecoveredChatEvent;

export declare const isSetPositionInQueuePayload: (detail: unknown) => detail is SetPositionInQueuePayload;

export declare function isThreadArchivedSuccessPayload(response: ChatEventData): response is ThreadArchivedEvent;

export declare const isThreadListFetchedPostbackData: (data: unknown) => data is ThreadListFetchedPostbackData;

export declare function isTokenRefreshedSuccessResponse(response: unknown): response is TokenRefreshedSuccessResponse;

export declare interface IThread {
    attachments: Array<any>;
    author: Author;
    canAddMoreMessages: boolean;
    channelId: ChannelId;
    content: string;
    createdAt: string;
    id: PostId;
    idOnExternalPlatform: string;
    image: string;
    isOwn: boolean;
    likes: number;
    recipients: Array<any>;
    tagIds: Array<number>;
    threadName: string;
    ticketNumber: string;
    title: string;
    unseenMessagesCount: number;
    unseenByEndUserMessagesCount: number;
    unseenByUserMessagesCount: number;
    updatedAt: string;
    url: string;
}

export declare class LivechatThread extends Thread {
    protected _isInitialized: boolean;
    protected _canSendMessage: boolean;
    constructor(idOnExternalPlatform: ThreadIdOnExternalPlatform, websocketClient: WebSocketClient, messageEmitter: IChatEventTarget, isAuthorizationEnabled?: boolean);
    /**
     *  Recover existing live chat
     */
    recover(): Promise<ThreadRecoveredPostbackData>;
    sendMessage(messageData: SendMessageEventData): Promise<MessageSuccessEventData>;
    /**
     * Start livechat
     * @param {string} [initialMessageText]
     */
    startChat(initialMessageText?: string): Promise<MessageSuccessEventData | void>;
    endChat(): Promise<void>;
    private _registerLivechatEventHandlers;
}

export declare interface LoadThreadMetadataChatEvent extends ChatEventData {
    data: ThreadMetadataLoadedPostbackData;
    type: AwsResponseEventType.THREAD_METADATA_LOADED;
}

export declare type Message = yup.InferType<typeof messageSchema> & {
    id: MessageId;
    idOnExternalPlatform: MessageIdOnExternalPlatform;
    threadId: ThreadId;
    threadIdOnExternalPlatform: ThreadIdOnExternalPlatform;
    postId: PostId;
    contactNumber: ContactNumber;
    messageContent: MessageContent;
    authorUser: User | null;
    authorEndUserIdentity: EndUserIdentity | null;
    attachments: Array<Attachment_2>;
    direction: MessageDirection;
    authorNameRemoved: ContentRemoved;
    contentRemoved: ContentRemoved;
    replyChannel: Channel | null;
    recipients: Array<Recipient>;
    sentiment: Sentiment;
    tags: Array<Tag>;
    user?: User;
    userStatistics: UserStatistics;
    seen: Array<MessageSeen>;
    delivered: Array<MessageDelivered>;
};

declare type MessageContent = Override<yup.InferType<typeof messageContentSchema>, {
    type: MessageType;
}>;

declare const messageContentSchema: yup.ObjectSchema<{
    text: string;
    type: string;
    payload: {
        text: any;
        postback: any;
        elements: any;
    };
    fallbackText: string;
    isAutoTranslated: boolean;
}>;

declare type MessageCreatedData = yup.InferType<typeof messageCreatedDataSchema> & {
    brand: Brand;
    message: Message;
    case: Case;
    channel: Channel;
    thread: Thread_2;
};

declare const messageCreatedDataSchema: yup.ObjectSchema<{
    brand: object & {
        id: any;
        tenantId: any;
        businessUnitId: any;
    };
    message: object & {
        id: any;
        idOnExternalPlatform: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        postId: any;
        contactNumber: any;
        replyToMessage: any;
        messageContent: any;
        hasAdditionalMessageContent: any;
        reactionStatistics: any;
        tags: any;
        sentiment: any;
        createdAt: any;
        direction: any;
        isRead: any;
        isReplyAllowed: any;
        readAt: any;
        authorUser: any;
        attachments: any;
        authorNameRemoved: any;
        contentRemoved: any;
        deletedOnExternalPlatform: any;
        isHiddenOnExternalPlatform: any;
        authorEndUserIdentity: any;
        url: any;
        user: any;
        recipients: any;
        title: any;
        replyChannel: any;
        customerStatistics: any;
        userStatistics: any;
        seen: any;
        delivered: any;
    };
    case: object & {
        id: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        status: any;
        direction: any;
        routingQueueId: any;
        routingQueuePriority: any;
        inboxAssignee: any;
        inboxAssigneeUser: any;
        inboxPreAssigneeUser: any;
        ownerAssignee: any;
        ownerAssigneeUser: any;
        endUserRecipients: any;
        detailUrl: any;
        authorEndUserIdentity: any;
        statistics: any;
        recipientsCustomers: any;
        recipients: any;
    };
    channel: object & {
        id: any;
        name: any;
        integrationBoxIdentifier: any;
        idOnExternalPlatform: any;
        realExternalPlatformId: any;
        externalPlatformAvatar: any;
        canAgentInviteCustomersToContact: any;
        canReplyToAnyMessage: any;
        canSaveResponse: any;
        contentFormat: any;
        externalPlatformIcon: any;
        hasAbilityToDelete: any;
        hasAbilityToForwardMessage: any;
        hasAbilityToHide: any;
        hasAbilityToChangeFrom: any;
        hasAbilityToChangeRecipient: any;
        hasAbilityToLike: any;
        hasAbilityToQuoteMessage: any;
        hasAbilityToSendFiles: any;
        hasAbilityToShare: any;
        hasAbilityToTag: any;
        hasCcAndBcc: any;
        hasCustomerOnThirdParty: any;
        hasEditableTitle: any;
        hasMultipleRecipient: any;
        hasMultipleThreadsPerEndUser: any;
        hasOutboundFlow: any;
        hasOutboundTemplates: any;
        hasPostAsPlaceholder: any;
        hasPublishing: any;
        hasReply: any;
        hasTreeStructure: any;
        hasVisibleRecipients: any;
        hasVisibleTitle: any;
        channelIntegrationId: any;
        isAutomaticSignatureAttached: any;
        isCaseBasedStorage: any;
        isHidden: any;
        isDeleted: any;
        isLiveChat: any;
        isPostWritable: any;
        isPrivate: any;
        mediaType: any;
        nicknameOnExternalPlatform: any;
        ownerUserId: any;
        replyPrefixMentionTemplate: any;
        studioScript: any;
        translationGroup: any;
        wysiwygEnabled: any;
    };
    thread: object & {
        id: any;
        idOnExternalPlatform: any;
        threadName: any;
    };
}>;

declare interface MessageCreatedEvent extends ChatEventData {
    data: MessageCreatedData;
    type: PushUpdateEventType.MESSAGE_CREATED;
}

declare type MessageDelivered = yup.InferType<typeof messageDeliveredSchema>;

declare const messageDeliveredSchema: yup.ObjectSchema<{
    userId: number;
    endUserId: string;
    deliveredAt: Date;
}>;

export declare enum MessageDirection {
    INBOUND = "inbound",
    OUTBOUND = "outbound"
}

declare interface MessageFailedEventData extends MessageSuccessEventData {
    error: {
        errorCode: string;
        errorMessage: string;
        transactionId: string;
    };
    id: string;
}

declare type MessageId = Flavor<string, 'MessageId'>;

declare type MessageIdOnExternalPlatform = Flavor<string, 'MessageIdOnExternalPlatform'>;

declare type MessagePayload = {
    text?: string | null;
    postback?: string | null;
    elements?: Array<any> | null;
};

declare const messageSchema: yup.ObjectSchema<{
    id: string;
    idOnExternalPlatform: string;
    threadId: string;
    threadIdOnExternalPlatform: string;
    postId: string;
    contactNumber: string;
    replyToMessage: {
        id: any;
        idOnExternalPlatform: any;
    } | null;
    messageContent: object & {
        text: any;
        type: any;
        payload: any;
        fallbackText: any;
        isAutoTranslated: any;
    };
    hasAdditionalMessageContent: boolean;
    reactionStatistics: {
        likes: any;
        shares: any;
        isLikedByChannel: any;
        isSharedByChannel: any;
    };
    tags: (object & {
        id: any;
        color: any;
        title: any;
        isActive: any;
    })[];
    sentiment: string;
    createdAt: string;
    direction: string;
    isRead: boolean;
    isReplyAllowed: boolean;
    readAt: Date | null;
    authorUser: (object & {
        id: any;
        incontactId: any;
        emailAddress: any;
        loginUsername: any;
        firstName: any;
        surname: any;
        nickname: any;
        isBotUser: any;
        isSurveyUser: any;
        imageUrl: any;
        publicImageUrl: any;
    }) | null;
    attachments: (object & {
        friendlyName: any;
        securedPermanentUrl: any;
        url: any;
        mimeType: any;
        previewUrl: any;
        isInline: any;
        canBeStored: any;
        id: any;
    })[];
    authorNameRemoved: (object & {
        reason: any;
        removedAt: any;
    }) | null;
    contentRemoved: (object & {
        reason: any;
        removedAt: any;
    }) | null;
    deletedOnExternalPlatform: boolean;
    isHiddenOnExternalPlatform: boolean;
    authorEndUserIdentity: (object & {
        id: any;
        idOnExternalPlatform: any;
        fullName: any;
        firstName: any;
        lastName: any;
        nickname: any;
        image: any;
    }) | null;
    url: string | null;
    user: (object & {
        id: any;
        incontactId: any;
        emailAddress: any;
        loginUsername: any;
        firstName: any;
        surname: any;
        nickname: any;
        isBotUser: any;
        isSurveyUser: any;
        imageUrl: any;
        publicImageUrl: any;
    }) | null | undefined;
    recipients: (object & {
        idOnExternalPlatform: any;
        name: any;
        isPrimary: any;
        isPrivate: any;
    })[];
    title: string;
    replyChannel: (object & {
        id: any;
        name: any;
        integrationBoxIdentifier: any;
        idOnExternalPlatform: any;
        realExternalPlatformId: any;
        externalPlatformAvatar: any;
        canAgentInviteCustomersToContact: any;
        canReplyToAnyMessage: any;
        canSaveResponse: any;
        contentFormat: any;
        externalPlatformIcon: any;
        hasAbilityToDelete: any;
        hasAbilityToForwardMessage: any;
        hasAbilityToHide: any;
        hasAbilityToChangeFrom: any;
        hasAbilityToChangeRecipient: any;
        hasAbilityToLike: any;
        hasAbilityToQuoteMessage: any;
        hasAbilityToSendFiles: any;
        hasAbilityToShare: any;
        hasAbilityToTag: any;
        hasCcAndBcc: any;
        hasCustomerOnThirdParty: any;
        hasEditableTitle: any;
        hasMultipleRecipient: any;
        hasMultipleThreadsPerEndUser: any;
        hasOutboundFlow: any;
        hasOutboundTemplates: any;
        hasPostAsPlaceholder: any;
        hasPublishing: any;
        hasReply: any;
        hasTreeStructure: any;
        hasVisibleRecipients: any;
        hasVisibleTitle: any;
        channelIntegrationId: any;
        isAutomaticSignatureAttached: any;
        isCaseBasedStorage: any;
        isHidden: any;
        isDeleted: any;
        isLiveChat: any;
        isPostWritable: any;
        isPrivate: any;
        mediaType: any;
        nicknameOnExternalPlatform: any;
        ownerUserId: any;
        replyPrefixMentionTemplate: any;
        studioScript: any;
        translationGroup: any;
        wysiwygEnabled: any;
    }) | null;
    customerStatistics: {
        seenAt: any;
    };
    userStatistics: object & {
        seenAt: any;
        readAt: any;
        createdToReadSeconds: any;
    };
    seen: (object & {
        userId: any;
        endUserId: any;
        seenAt: any;
    })[];
    delivered: (object & {
        userId: any;
        endUserId: any;
        deliveredAt: any;
    })[];
}>;

declare type MessageSeen = yup.InferType<typeof messageSeenSchema>;

declare const messageSeenSchema: yup.ObjectSchema<{
    userId: number;
    endUserId: string;
    seenAt: Date;
}>;

export declare interface MessageSuccessEventData extends ChatEventData {
    id: string;
}

export declare enum MessageType {
    TEXT = "TEXT",
    FILE = "FILE",
    PLUGIN = "PLUGIN",
    POSTBACK = "POSTBACK",
    QUICK_REPLIES = "QUICK_REPLIES"
}

export declare interface MoreMessagesLoadedEvent extends ChatEventData {
    data: MoreMessagesLoadedPostbackData;
}

declare interface MoreMessagesLoadedPostbackData extends AwsResponseEventPostbackData {
    messages: Message[];
    scrollToken: string;
}

declare type Override<T1, T2> = Omit<T1, keyof T2> & T2;

declare type PostId = ThreadId;

declare type PushUpdateContext = {
    initiator?: PushUpdateContextInitiator;
};

declare type PushUpdateContextInitiator = {
    type: PushUpdateContextInitiatorType;
    id: PushUpdateContextInitiatorId;
};

declare type PushUpdateContextInitiatorId = Flavor<string, 'PushUpdateContextInitiatorId'>;

declare enum PushUpdateContextInitiatorType {
    SYSTEM = "system",
    USER = "user",
    API = "api",
    EXTERNAL = "external",
    WORKFLOW = "workflow",
    WORKFLOW_JOB = "workflowJob",
    ROUTING = "routing"
}

declare type PushUpdateEventFields = Override<yup.InferType<typeof pushUpdateEventFieldsSchema>, {
    eventId: PushUpdateEventId;
    eventObject: PushUpdateEventObject;
    eventType: PushUpdateEventType;
    context?: PushUpdateContext;
}>;

declare const pushUpdateEventFieldsSchema: yup.ObjectSchema<{
    eventId: string;
    eventObject: string;
    eventType: string;
    context: (object & {
        initiator: any;
    }) | null;
    createdAt: Date;
}>;

declare type PushUpdateEventId = Flavor<string, 'PushUpdateEventId'>;

declare enum PushUpdateEventObject {
    CASE = "Case",
    CHANNEL = "Channel",
    MESSAGE = "Message",
    PAGE_VIEW = "PageView",
    ROUTING_QUEUE = "RoutingQueue",
    SENDER_ACTION = "SenderAction",
    USER_STATUS = "UserStatus",
    CHAT_WINDOW = "ChatWindow",
    CUSTOMER_CONTACT = "CustomerContact",
    CONSUMER_CONTACT = "ConsumerContact",
    CONTACT = "Contact",
    MESSAGE_NOTE = "MessageNote"
}

declare enum PushUpdateEventType {
    AUTHORIZE_CONSUMER = "AuthorizeConsumer",
    CASE_CREATED = "CaseCreated",
    CASE_INBOX_ASSIGNEE_CHANGED = "CaseInboxAssigneeChanged",
    CASE_STATUS_CHANGED = "CaseStatusChanged",
    CASE_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED = "CaseToRoutingQueueAssignmentChanged",
    CHANNEL_CREATED = "ChannelCreated",
    CHANNEL_DELETED = "ChannelDeleted",
    CHANNEL_UPDATED = "ChannelUpdated",
    MESSAGE_ADDED_INTO_CASE = "MessageAddedIntoCase",
    MESSAGE_CREATED = "MessageCreated",
    MESSAGE_DELIVERED_TO_END_USER = "MessageDeliveredToEndUser",
    MESSAGE_DELIVERED_TO_USER = "MessageDeliveredToUser",
    MESSAGE_NOTE_CREATED = "MessageNoteCreated",
    MESSAGE_NOTE_UPDATED = "MessageNoteUpdated",
    MESSAGE_NOTE_DELETED = "MessageNoteDeleted",
    MESSAGE_READ_CHANGED = "MessageReadChanged",
    MESSAGE_SEEN_BY_END_USER = "MessageSeenByEndUser",
    MESSAGE_SEEN_BY_USER = "MessageSeenByUser",
    MESSAGE_UPDATED = "MessageUpdated",
    PAGE_VIEW_CREATED = "PageViewCreated",
    ROUTING_QUEUE_CREATED = "RoutingQueueCreated",
    ROUTING_QUEUE_DELETED = "RoutingQueueDeleted",
    ROUTING_QUEUE_UPDATED = "RoutingQueueUpdated",
    SUBQUEUE_ASSIGNED_TO_ROUTING_QUEUE = "SubqueueAssignedToRoutingQueue",
    SUBQUEUE_UNASSIGNED_TO_ROUTING_QUEUE = "SubqueueUnassignedFromRoutingQueue",
    USER_ASSIGNED_TO_ROUTING_QUEUE = "UserAssignedToRoutingQueue",
    USER_STATUS_CHANGED = "UserStatusChanged",
    USER_UNASSIGNED_FROM_ROUTING_QUEUE = "UserUnassignedFromRoutingQueue",
    AGENT_CONTACT_STARTED = "AgentContactStarted",
    AGENT_CONTACT_ENDED = "AgentContactEnded",
    SENDER_TYPING_STARTED = "SenderTypingStarted",
    SENDER_TYPING_ENDED = "SenderTypingEnded",
    FIRE_PROACTIVE = "FireProactiveAction",
    CONTACT_INBOX_PRE_ASSIGNEE_CHANGED = "ConsumerContactInboxPreAssigneeChanged",
    CONTACT_RECIPIENTS_CHANGED = "ContactRecipientsChanged"
}

declare type Recipient = yup.InferType<typeof recipientSchema> & {
    idOnExternalPlatform: IdentityIdOnExternalPlatform;
};

declare const recipientSchema: yup.ObjectSchema<{
    idOnExternalPlatform: string;
    name: string;
    isPrimary: boolean;
    isPrivate: boolean;
}>;

export declare type RemoveListenerFunction = () => void;

declare type RoutingQueue = yup.InferType<typeof routingQueueSchema> & {
    id: RoutingQueueId;
};

declare type RoutingQueueId = Flavor<string, 'RoutingQueueId'>;

declare const routingQueueSchema: yup.ObjectSchema<{
    id: string;
    name: string;
    isSubqueue: boolean;
}>;

export declare interface SendMessageEventData extends AwsInputEventData {
    accessToken?: {
        token: string;
    };
    thread: {
        idOnExternalPlatform: string;
        threadName?: string;
    };
    consumer: {
        customFields: CustomField[];
    };
    consumerContact: {
        customFields: CustomField[];
    };
    idOnExternalPlatform: MessageId;
    messageContent: {
        type: MessageType;
        payload: MessagePayload;
    };
    attachments: Attachment[];
    browserFingerprint: BrowserFingerprint;
}

declare interface SendMessageOptions {
    browserFingerprint?: BrowserFingerprint;
    messageId?: MessageId;
    threadCustomFields?: CustomFields;
}

declare enum Sentiment {
    POSITIVE = "positive",
    NEUTRAL = "neutral",
    NEGATIVE = "negative"
}

declare interface SetPositionInQueuePayload {
    eventType: AwsResponseEventType.SET_POSITION_IN_QUEUE;
    eventId: EventId;
    data: SetPositionInQueuePayloadData;
}

declare interface SetPositionInQueuePayloadData {
    consumerContact: {
        id: CaseId;
    };
    positionInQueue: number;
    routingQueue: {
        id: RoutingQueueId;
    };
    isAnyAgentOnlineForQueue: boolean;
}

export declare function splitName(name: string): [string, string];

declare type Statistics = yup.InferType<typeof statisticsSchema> & {
    inboxAssigneeResponseTime: InboxAssigneeResponseTime | null;
};

declare const statisticsSchema: yup.ObjectSchema<{
    inboxAssigneeResponseTime: (object & {
        valueInSeconds: any;
        slaInSeconds: any;
        slaEnabled: any;
        isRunning: any;
    }) | null;
}>;

declare type Tag = yup.InferType<typeof tagSchema>;

declare const tagSchema: yup.ObjectSchema<{
    id: number;
    color: string;
    title: string;
    isActive: boolean;
}>;

export declare class Thread {
    idOnExternalPlatform: ThreadIdOnExternalPlatform;
    protected _websocketClient: WebSocketClient;
    protected _exists: boolean;
    protected _messageEmitter: IChatEventTarget;
    protected _typingTimeoutID: ReturnType<typeof setTimeout> | undefined;
    protected _threadCustomFieldsQueue: CustomFields;
    protected _isAuthorizationEnabled: boolean;
    constructor(idOnExternalPlatform: ThreadIdOnExternalPlatform, websocketClient: WebSocketClient, messageEmitter: IChatEventTarget, isAuthorizationEnabled?: boolean);
    /**
     *  Recover existing chat
     */
    recover(): Promise<ThreadRecoveredPostbackData>;
    /**
     * Send message
     * @param messageData
     */
    sendMessage(messageData: SendMessageEventData): Promise<MessageSuccessEventData>;
    /**
     * Send text message
     * @param {string} messageText
     * @param {SendMessageOptions} [options]
     */
    sendTextMessage(messageText: string, options?: SendMessageOptions): Promise<MessageSuccessEventData>;
    /**
     * Load previous messages
     * @async
     * @return previous messages
     */
    loadMoreMessages(): Promise<MoreMessagesLoadedEvent | null>;
    /**
     * Mark all messages in the thread as seen
     */
    lastMessageSeen(): Promise<ChatEventData>;
    /**
     * Send attachment
     * @param {FileList} files - An object of this type is returned by the files' property of the HTML <input> element; this lets you access the list of files selected with the <input type="file"> element.
     * @param {SendMessageOptions} [options]
     * @description Raw function to send attachments
     * @return when upload failed UploadFailResponse contains allowed file size and file types
     */
    sendAttachments(files: FileList, options?: SendMessageOptions): Promise<MessageSuccessEventData | UploadFailResponse>;
    /**
     * Send start and stop typing events. It sends stop typing event after the timeout. Repeated calls resets this timeout.
     * @param timeout [timeout=1000] - The timeout in milliseconds.
     */
    keystroke(timeout?: number): void;
    /**
     * Manually send the stop typing event and clear the keystroke timeout.
     */
    stopTyping(): void;
    /**
     * Get Thread Metadata
     * @returns {LoadThreadMetadataChatEvent} response otherwise throw an error response
     */
    getMetadata(): Promise<LoadThreadMetadataChatEvent>;
    onThreadEvent(type: ChatEventType, handler: EventListenerFunction): RemoveListenerFunction;
    /**
     * Set thread custom fields
     * @param customFields custom fields object
     * @example { indentName: 'value' }
     */
    setCustomFields(customFields: CustomFields): Promise<void>;
    /**
     * Set thread custom field
     * @param name custom field name
     * @param value custom field value
     */
    setCustomField(name: string, value: string): Promise<void>;
    /**
     * Set thread as archived
     * @returns {true} if success otherwise throw error response
     */
    archive(): Promise<true>;
    /**
     * Set thread name
     * @param name New name of the Thread
     * @returns {true} if success otherwise throw an error response
     */
    setName(name: string): Promise<true>;
    private _registerEventHandlers;
    /**
     * Send message preview
     * @param text
     */
    sendMessagePreview(text: string): Promise<void>;
}

declare type Thread_2 = yup.InferType<typeof threadSchema> & {
    id: ThreadId;
    idOnExternalPlatform: ThreadIdOnExternalPlatform;
};

declare interface ThreadArchivedEvent extends ChatEventData {
    type: AwsResponseEventType.THREAD_ARCHIVED;
}

declare type ThreadId = Flavor<string, 'ThreadId'>;

export declare type ThreadIdOnExternalPlatform = Flavor<string, 'ThreadIdOnExternalPlatform'>;

declare interface ThreadListFetchedPostbackData extends AwsResponseEventPostbackData {
    threads: IThread[];
}

declare interface ThreadMetadataLoadedPostbackData extends AwsResponseEventPostbackData {
    lastMessage: Message;
    ownerAssignee: Agent;
}

declare interface ThreadRecoveredChatEvent extends ChatEventData {
    data: ThreadRecoveredPostbackData;
}

export declare interface ThreadRecoveredPostbackData extends AwsResponseEventPostbackData {
    consumerContact: ConsumerContact;
    ownerAssignee: UserFromApiData | null;
    inboxAssignee: UserFromApiData | null;
    messages: Message[];
    messagesScrollToken: string;
    thread: {
        id: ThreadId;
        idOnExternalPlatform: string;
        threadName: string;
    };
    contactHistory: Array<PushUpdateEventFields>;
    customer: Override<Customer, {
        customFields: Array<CustomField>;
    }>;
}

declare const threadSchema: yup.ObjectSchema<{
    id: string;
    idOnExternalPlatform: string;
    threadName: string;
}>;

declare interface TokenRefreshedPostbackData extends AwsResponseEventPostbackData {
    accessToken: AccessToken;
}

declare interface TokenRefreshedSuccessResponse {
    data: TokenRefreshedPostbackData;
    type: AwsResponseEventType.TOKEN_REFRESHED;
}

export declare interface UploadFailResponse {
    allowedFileSize: string;
    allowedFileTypes: Array<{
        description: string;
        mimeType: string;
    }>;
}

declare type User = yup.InferType<typeof userSchema> & {
    id: UserId;
};

declare interface UserFromApiData {
    firstName: string;
    id: number;
    image?: string;
    nickname: string | null;
    surname: string;
}

declare type UserId = Flavor<number, 'UserId'>;

declare const userSchema: yup.ObjectSchema<{
    id: number;
    incontactId: string | null;
    emailAddress: string;
    loginUsername: string;
    firstName: string;
    surname: string;
    nickname: string | null | undefined;
    isBotUser: boolean;
    isSurveyUser: boolean;
    imageUrl: string | undefined;
    publicImageUrl: string | null;
}>;

declare type UserStatistics = yup.InferType<typeof userStatisticsSchema>;

declare const userStatisticsSchema: yup.ObjectSchema<{
    seenAt: Date | null;
    readAt: Date | null;
    createdToReadSeconds: {
        notReflectingBusinessHours: any;
        reflectingBusinessHours: any;
    } | null;
}>;

/**
 * Websocket client
 */
export declare class WebSocketClient {
    private brandId;
    private channelId;
    private customerId;
    private options?;
    private _connection;
    constructor(brandId: BrandId, channelId: ChannelId, customerId: CustomerIdentityIdOnExternalPlatform, options?: WebSocketClientOptions | undefined);
    /**
     * Connect websocket
     */
    connect(): void;
    /**
     * Disconnect websocket
     */
    disconnect(): void;
    /**
     * Reconnect websocket
     */
    reconnect(): void;
    /**
     * Send data to active connection
     * @param data
     */
    send(data: unknown): void;
    /**
     * Register event handler to websocket event
     * @param eventType websocket event
     * @param handlerCallback event handler
     */
    on(eventType: WebSocketClientEvent_2, handlerCallback: (event: CustomEvent) => void): void;
    /**
     * Unregister event handler to websocket event
     * @param eventType websocket event
     * @param handlerCallback event handler
     */
    off(eventType: WebSocketClientEvent_2, handlerCallback: (event: CustomEvent) => void): void;
    _errorHandler(type: string, closeEvent: CloseEvent_2 | undefined): void;
}

declare class WebSocketClientError extends Error {
    name: string;
    constructor(message: string, reason?: string);
}

export declare const WebSocketClientEvent: typeof WebSocketClientEvent_2;

declare enum WebSocketClientEvent_2 {
    CLOSE = "close",
    MESSAGE = "message",
    OPEN = "open"
}

declare interface WebSocketClientOptions {
    /**
     * host for websocket connection
     */
    host?: string;
    /**
     * common error handler
     */
    onError?: (error: WebSocketClientError) => void;
    /**
     * port for websocket connection
     */
    port?: string;
}

declare interface WebSocketEventListenerMap {
    close: (event: CloseEvent_3) => void | {
        handleEvent: (event: CloseEvent_3) => void;
    };
    error: (event: ErrorEvent_2) => void | {
        handleEvent: (event: ErrorEvent_2) => void;
    };
    message: (event: MessageEvent) => void | {
        handleEvent: (event: MessageEvent) => void;
    };
    open: (event: Event_2) => void | {
        handleEvent: (event: Event_2) => void;
    };
}

declare interface WebSocketEventMap_2 {
    close: CloseEvent_3;
    error: ErrorEvent_2;
    message: MessageEvent;
    open: Event_2;
}

export { }
