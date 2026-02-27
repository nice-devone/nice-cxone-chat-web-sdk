import * as yup from 'yup';

export declare interface Abortable {
    abort: (reason?: string) => void;
    readonly abortReason?: string;
}

declare type AbortableExecutorFunction<T> = (resolve: (value: PromiseLike<T> | T) => void, reject: (reason?: unknown) => void, abortSignal: AbortSignal) => void;

/**
 * AbortablePromise is a Promise that can be aborted.
 * Source: https://github.com/zzdjk6/simple-abortable-promise, MIT License
 */
export declare class AbortablePromise<T> extends Promise<T> implements Abortable {
    abort: Abortable['abort'];
    constructor(executor: AbortableExecutorFunction<T>);
    private _abortReason?;
    get abortReason(): string | undefined;
    static from: <P>(promise: Promise<P>) => AbortablePromise<P>;
}

export declare class AbortError extends ChatSDKError {
    constructor(message?: string);
}

declare interface AccessToken {
    token: string;
    expiresIn: number;
}

export declare type Agent = User;

declare type AgentContact = Override<yup.InferType<typeof agentContactSchema>, {
    user: User;
}>;

declare const agentContactSchema: yup.ObjectSchema<{
    id: string;
    createdAt: string;
    user: object & {
        id: any;
        incontactId: any;
        agentId: any;
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
}>;

export declare type AgentId = UserId;

export declare type AgentTypingEndedData = TypingEventData;

export declare interface AgentTypingEndedEvent extends ChatEventData {
    data: AgentTypingEndedData;
    type: typeof ChatEvent.AGENT_TYPING_ENDED;
}

export declare type AgentTypingStartedData = TypingEventData;

export declare interface AgentTypingStartedEvent extends ChatEventData {
    data: AgentTypingStartedData;
    type: typeof ChatEvent.AGENT_TYPING_STARTED;
}

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
    routingMode?: ContactRoutingMode;
    preferredUserForNextAssign?: User | null;
};

export declare interface AssignedAgentChangedEvent extends ChatEventData {
    data: AssignedAgentChangedData;
    type: typeof ChatEvent.ASSIGNED_AGENT_CHANGED;
}

export declare type Attachment = Override<yup.InferType<typeof attachmentSchema>, {
    id: AttachmentId;
}>;

export declare type AttachmentId = Flavor<string, 'AttachmentId'>;

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

declare type AttachmentUpload = {
    url: string;
    friendlyName: string;
};

export declare class AuthorizationError extends ChatSDKError {
    data: MessageFailedEventData['error'] | undefined;
    constructor(message: string, data: MessageFailedEventData['error'] | undefined);
}

export declare interface AuthorizationToken {
    token: string;
}

export declare interface AuthorizeConsumerEventSuccessResponse extends ChatEventData {
    data: AuthorizeConsumerEventSuccessResponseData;
    type: AwsResponseEventType.CONSUMER_AUTHORIZED;
}

export declare interface AuthorizeConsumerEventSuccessResponseData extends ConsumerAuthorizationSuccessPayloadData {
    status: 'success';
}

declare interface AwsInputEventData {
}

declare enum AwsInputEventType {
    SENDER_TYPING_STARTED = "SenderTypingStarted",
    SENDER_TYPING_ENDED = "SenderTypingEnded",
    LOAD_MORE_MESSAGES = "LoadMoreMessages",
    RECOVER_LIVECHAT = "RecoverLivechat",
    RECOVER_THREAD = "RecoverThread",
    SEND_MESSAGE = "SendMessage",
    SEND_OUTBOUND = "SendOutbound",
    SEND_OFFLINE_MESSAGE = "SendOfflineMessage",
    SEND_PAGE_VIEWS = "SendPageViews",
    SEND_CONSUMER_CUSTOM_FIELDS = "SetConsumerCustomFields",
    SET_CONSUMER_CONTACT_CUSTOM_FIELD = "SetConsumerContactCustomFields",
    MESSAGE_SEEN = "MessageSeenByConsumer",
    SEND_TRANSCRIPT = "SendTranscript",
    FETCH_THREAD_LIST = "FetchThreadList",
    END_CONTACT = "EndContact",
    EXECUTE_TRIGGER = "ExecuteTrigger",
    AUTHORIZE_CONSUMER = "AuthorizeConsumer",
    AUTHORIZE_CUSTOMER = "AuthorizeCustomer",
    RECONNECT_CONSUMER = "ReconnectConsumer",
    UPDATE_THREAD = "UpdateThread",
    ARCHIVE_THREAD = "ArchiveThread",
    LOAD_THREAD_METADATA = "LoadThreadMetadata",
    REFRESH_TOKEN = "RefreshToken",
    STORE_VISITOR = "StoreVisitor",
    STORE_VISITOR_EVENTS = "StoreVisitorEvents",
    CREATE_GROUP_CHAT_INVITE = "CreateInvitationToGroupChat",
    SEND_EMAIL_INVITE_TO_GROUP_CHAT = "SendEmailInvitationToGroupChat",
    JOIN_GROUP_CHAT = "JoinGroupChat",
    LEAVE_GROUP_CHAT = "LeaveGroupChat",
    GENERATE_AUTHORIZATION_TOKEN = "GenerateAuthorizationToken",
    ADD_VISITOR_TAGS = "AddVisitorTags",
    REMOVE_VISITOR_TAGS = "RemoveVisitorTags",
    SEND_MESSAGE_PREVIEW = "SendMessagePreview"
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

declare type Brand = Override<yup.InferType<typeof brandSchema>, {
    id: BrandId;
    tenantId: TenantId;
}>;

export declare type BrandId = Flavor<number, 'BrandId'>;

declare type BrandInfoColors = {
    buttonColor: string;
    headerBgColor: string;
    headerFontColor: string;
    themeColor: string;
    textColor: string;
    widgetBgColor: string;
    widgetFontColor: string;
};

declare type BrandInfoPopup = {
    name: string;
    url: string;
    urlTimeout: number;
    appearance: 'left' | 'center';
    headlineText: string;
    headlineColor: string | null;
    secondLineText: string;
    secondLineColor: string | null;
    backgroundImage: string;
};

declare type BrandInfoPreContactForm = {
    id: string;
    name: string;
    channels: Array<ChannelId>;
    customFields: Array<PreContactFormCustomField>;
};

declare type BrandInfoWidget = {
    appearance: 'bar' | 'bubble';
    position: 'left' | 'right';
};

declare const brandSchema: yup.ObjectSchema<{
    id: number;
    tenantId: string | null;
    businessUnitId: number | null;
    timezone: string | null;
    friendlyName: string;
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

export declare interface BrowserFingerprintOptions {
    country?: string | null;
    ip?: string | null;
    language?: string;
    location?: string | null;
}

export declare interface CachedStorageItem {
    data: unknown;
    expiresAt: number;
}

/**
 * Cache storage wrapper
 * - A simple wrapper around the Storage API with a TTL (Time To Live) per item.
 * - Uses JSON.stringify and JSON.parse to serialize and deserialize data.
 * - Uses Date.getTime() to calculate the expiration time.
 *
 * @param storage - The storage instance (e.g., localStorage or sessionStorage).
 */
declare class CacheStorage_2 implements ICacheStorage {
    #private;
    /**
     * Create a new CacheStorage instance
     * @param storage - storage instance
     * @throws CacheStorageError
     */
    constructor(storage: Storage);
    /**
     * Get an item from the storage if not expired
     * @param key - key
     */
    getItem<T = unknown>(key: string): T | null;
    /**
     * Remove an item from the storage
     * @param key - key
     */
    removeItem(key: string): void;
    /**
     * Save an item in the storage with a ttl
     * @param key - key
     * @param data - data to store
     * @param ttl - time to live in milliseconds
     */
    setItem(key: string, data: unknown, ttl: number): void;
}
export { CacheStorage_2 as CacheStorage }

export declare class CacheStorageError extends Error {
    constructor(message: string);
}

declare type Case = Override<yup.InferType<typeof caseSchema>, {
    id: CaseId;
    threadId: ThreadId;
    threadIdOnExternalPlatform: ThreadIdOnExternalPlatform;
    consumerContactStorageId: ContactStorageId;
    status: ContactStatus;
    routingQueueId?: RoutingQueueId;
    authorEndUserIdentity?: EndUserIdentity;
    statistics: Statistics;
    inboxAssigneeUser?: User | null;
    inboxPreAssigneeUser?: User | null;
    ownerAssigneeUser?: User | null;
    routableType?: ContactRoutableType;
}>;

declare type CaseCreatedData = yup.InferType<typeof caseCreatedEventDataSchema> & {
    brand: Brand;
    case: Case;
    channel: Channel;
    thread: ThreadView;
    routingQueue?: RoutingQueue | null;
    routingMode?: ContactRoutingMode;
    preferredUserForNextAssign?: User | null;
};

declare const caseCreatedEventDataSchema: yup.ObjectSchema<{
    brand: object & {
        id: any;
        tenantId: any;
        businessUnitId: any;
        timezone: any;
        friendlyName: any;
    };
    case: object & {
        id: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        consumerContactStorageId: any;
        createdAt: any;
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
        routableType: any;
        proficiency: any;
        interactionId: any;
        contactId: any;
        customerContactId: any;
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
        isTrackingMessageDeliveryStatus: any;
        mediaType: any;
        nicknameOnExternalPlatform: any;
        ownerUserId: any;
        replyPrefixMentionTemplate: any;
        studioScript: any;
        translationGroup: any;
        wysiwygEnabled: any;
        pointOfContactId: any;
        channelNumber: any;
    };
    thread: object & {
        id: any;
        idOnExternalPlatform: any;
        threadName: any;
        channelId: any;
        canAddMoreMessages: any;
    };
    routingQueue: (object & {
        id: any;
        name: any;
        isSubqueue: any;
        isDeleted: any;
        skillId: any;
        isAcceptRejectFlowEnabled: any;
        acceptRejectFlowRefusalTimeoutInSeconds: any;
    }) | null | undefined;
    routingMode: string | undefined;
    preferredUserForNextAssign: (object & {
        id: any;
        incontactId: any;
        agentId: any;
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
        timezone: any;
        friendlyName: any;
    };
    case: object & {
        id: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        consumerContactStorageId: any;
        createdAt: any;
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
        routableType: any;
        proficiency: any;
        interactionId: any;
        contactId: any;
        customerContactId: any;
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
        isTrackingMessageDeliveryStatus: any;
        mediaType: any;
        nicknameOnExternalPlatform: any;
        ownerUserId: any;
        replyPrefixMentionTemplate: any;
        studioScript: any;
        translationGroup: any;
        wysiwygEnabled: any;
        pointOfContactId: any;
        channelNumber: any;
    };
    inboxAssignee: object & {
        id: any;
        incontactId: any;
        agentId: any;
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
        agentId: any;
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
    routingQueue: (object & {
        id: any;
        name: any;
        isSubqueue: any;
        isDeleted: any;
        skillId: any;
        isAcceptRejectFlowEnabled: any;
        acceptRejectFlowRefusalTimeoutInSeconds: any;
    }) | null;
    routingMode: string | undefined;
    preferredUserForNextAssign: (object & {
        id: any;
        incontactId: any;
        agentId: any;
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
}>;

declare const caseSchema: yup.ObjectSchema<{
    id: string;
    threadId: string;
    threadIdOnExternalPlatform: string;
    consumerContactStorageId: string;
    createdAt: string;
    status: string;
    direction: string;
    routingQueueId: string;
    routingQueuePriority: number;
    inboxAssignee: number;
    inboxAssigneeUser: (object & {
        id: any;
        incontactId: any;
        agentId: any;
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
        agentId: any;
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
        agentId: any;
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
    endUserRecipients: Override<{
        idOnExternalPlatform: string;
        name: string;
        isPrivate: boolean;
        isPrimary: boolean;
        anonymizedAt: string | null;
        anonymizedReason: string | null;
    }, {
        idOnExternalPlatform: IdentityIdOnExternalPlatform;
    }>[];
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
    recipients: Override<{
        idOnExternalPlatform: string;
        name: string;
        isPrivate: boolean;
        isPrimary: boolean;
        anonymizedAt: string | null;
        anonymizedReason: string | null;
    }, {
        idOnExternalPlatform: IdentityIdOnExternalPlatform;
    }>[];
    routableType: string | undefined;
    proficiency: object & {
        from: any;
        to: any;
    };
    interactionId: string;
    contactId: string;
    customerContactId: string | null;
}>;

declare type CaseStatusChangedData = yup.InferType<typeof caseStatusChangedEventDataSchema> & {
    brand: Brand;
    case: Case;
    channel: Channel;
    routingQueue?: RoutingQueue | null;
    routingMode?: ContactRoutingMode;
    preferredUserForNextAssign?: User | null;
};

declare const caseStatusChangedEventDataSchema: yup.ObjectSchema<{
    brand: object & {
        id: any;
        tenantId: any;
        businessUnitId: any;
        timezone: any;
        friendlyName: any;
    };
    case: object & {
        id: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        consumerContactStorageId: any;
        createdAt: any;
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
        routableType: any;
        proficiency: any;
        interactionId: any;
        contactId: any;
        customerContactId: any;
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
        isTrackingMessageDeliveryStatus: any;
        mediaType: any;
        nicknameOnExternalPlatform: any;
        ownerUserId: any;
        replyPrefixMentionTemplate: any;
        studioScript: any;
        translationGroup: any;
        wysiwygEnabled: any;
        pointOfContactId: any;
        channelNumber: any;
    };
    routingQueue: (object & {
        id: any;
        name: any;
        isSubqueue: any;
        isDeleted: any;
        skillId: any;
        isAcceptRejectFlowEnabled: any;
        acceptRejectFlowRefusalTimeoutInSeconds: any;
    }) | null | undefined;
    routingMode: string | undefined;
    preferredUserForNextAssign: (object & {
        id: any;
        incontactId: any;
        agentId: any;
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
}>;

declare type Channel = yup.InferType<typeof channelSchema> & {
    id: ChannelId;
    idOnExternalPlatform: ChannelIdOnExternalPlatform;
    contentFormat: ContentFormat;
};

export declare enum ChannelAvailability {
    ONLINE = "online",
    OFFLINE = "offline"
}

export declare interface ChannelAvailabilityResponse {
    status: ChannelAvailability;
}

export declare type ChannelId = Flavor<string, 'ChannelId'>;

declare type ChannelIdOnExternalPlatform = Flavor<string, 'ChannelIdOnExternalPlatform'>;

export declare interface ChannelInfo {
    availability: {
        status: ChannelAvailability;
    };
    name: string;
    isLiveChat: boolean;
    settings: ChannelInfoSettings;
    translations: {
        [key: string]: string;
    };
    colors: BrandInfoColors;
    widget: BrandInfoWidget;
    popups: Array<BrandInfoPopup>;
    customCss: string;
    customJs: string;
    customJsFiles: string;
    channelIdOnExternalPlatform: string;
    preContactForm: BrandInfoPreContactForm | null;
    isAuthorizationEnabled: boolean;
    isSecuredCookieEnabled: boolean;
    isUnsecuredConnectionAllowed: boolean;
    webSecurityConfiguration: WebSecurityConfiguration;
}

declare interface ChannelInfoFeatures {
    accessibleFormFields: boolean;
    chatExtendedLogging: boolean;
    chatOptimizeQueueCountingForChat: boolean;
    disableAttachmentOnDfoChat: boolean;
    enableClientSideEventsThrottling: boolean;
    isCoBrowsingEnabled: boolean;
    isCreditCardMaskingEnabled: boolean;
    isFeatureGroupChatEnabled: boolean;
    isFeatureImproveVisitorInactivityTrackingEnabled: boolean;
    isFeatureQueueCountingEnabled: boolean;
    isProactiveChatEnabled: boolean;
    isWebAnalyticsEnabled: boolean;
    liveChatLogoHidden: boolean;
    securedSessions: boolean;
    splitChannelInfoAndAvailability: boolean;
    useStorageModuleInChat: boolean;
    chatInitializationWithoutWebsocket: boolean;
}

declare type ChannelInfoSettings = {
    features: ChannelInfoFeatures;
    fileRestrictions: FileRestrictionsSettings;
    hasPageViews: boolean;
    pushNotifications?: PushNotificationSettings;
    liveChatShowOfflineForm: boolean;
    liveChatOfflineForm: {
        isEnabled: boolean;
        isCustom: boolean;
        html: string;
    };
    liveChatHiddenOnOffline: boolean;
    liveChatAllowTranscript: boolean;
    liveChatTranscriptChannelId: ChannelId;
    hasMultipleThreadsPerEndUser: boolean;
    liveChatAllowAudioNotification: boolean;
    isGroupChatAllowed: boolean;
    canCustomerInviteToGroupChat: boolean;
    canAgentInviteToGroupChat: boolean;
    platformChannelIdToSendInvitationCode: string;
    emailInvitationContent: string;
    emailInvitationLink: string;
    enableChatTypingPreview: boolean;
    chatRedesign: boolean;
};

declare const channelSchema: yup.ObjectSchema<{
    id: string;
    name: string;
    integrationBoxIdentifier: string | null;
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
    isTrackingMessageDeliveryStatus: boolean;
    mediaType: number | undefined;
    nicknameOnExternalPlatform: string;
    ownerUserId: number;
    replyPrefixMentionTemplate: string;
    studioScript: string | null;
    translationGroup: string;
    wysiwygEnabled: boolean;
    pointOfContactId: number | null;
    channelNumber: number | null;
}>;

export declare const CHAT_SDK_VERSION: string;

declare class ChatCustomEvent<T extends ChatEventData = ChatEventData> extends CustomEvent<T> {
}

export declare const ChatEvent: {
    readonly AGENT_TYPING_STARTED: "AgentTypingStarted";
    readonly AGENT_TYPING_ENDED: "AgentTypingEnded";
    readonly ASSIGNED_AGENT_CHANGED: "AssignedAgentChanged";
    readonly CONTACT_CREATED: "ContactCreated";
    readonly CONTACT_STATUS_CHANGED: "ContactStatusChanged";
    readonly CONTACT_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED: "ContactToRoutingQueueAssignmentChanged";
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
    readonly CONTACT_PREFERRED_USER_CHANGED: PushUpdateEventType.CONTACT_PREFERRED_USER_CHANGED;
    readonly CONTACT_PROFICIENCY_CHANGED: PushUpdateEventType.CONTACT_PROFICIENCY_CHANGED;
    readonly CONTACT_PRIORITY_CHANGED: PushUpdateEventType.CONTACT_PRIORITY_CHANGED;
    readonly CONTACT_SYNC: PushUpdateEventType.CONTACT_SYNC;
    readonly CHANNEL_CREATED: PushUpdateEventType.CHANNEL_CREATED;
    readonly CHANNEL_DELETED: PushUpdateEventType.CHANNEL_DELETED;
    readonly CHANNEL_UPDATED: PushUpdateEventType.CHANNEL_UPDATED;
    readonly MESSAGE_ADDED_INTO_CASE: PushUpdateEventType.MESSAGE_ADDED_INTO_CASE;
    readonly MESSAGE_CREATED: PushUpdateEventType.MESSAGE_CREATED;
    readonly MESSAGE_DELIVERED_TO_END_USER: PushUpdateEventType.MESSAGE_DELIVERED_TO_END_USER;
    readonly MESSAGE_DELIVERED_TO_USER: PushUpdateEventType.MESSAGE_DELIVERED_TO_USER;
    readonly MESSAGE_DELIVERY_STATUS_CHANGED: PushUpdateEventType.MESSAGE_DELIVERY_STATUS_CHANGED;
    readonly MESSAGE_NOTE_CREATED: PushUpdateEventType.MESSAGE_NOTE_CREATED;
    readonly MESSAGE_NOTE_UPDATED: PushUpdateEventType.MESSAGE_NOTE_UPDATED;
    readonly MESSAGE_NOTE_DELETED: PushUpdateEventType.MESSAGE_NOTE_DELETED;
    readonly MESSAGE_READ_CHANGED: PushUpdateEventType.MESSAGE_READ_CHANGED;
    readonly MESSAGE_SEEN_BY_END_USER: PushUpdateEventType.MESSAGE_SEEN_BY_END_USER;
    readonly MESSAGE_SEEN_BY_USER: PushUpdateEventType.MESSAGE_SEEN_BY_USER;
    readonly MESSAGE_SEEN_CHANGED: PushUpdateEventType.MESSAGE_SEEN_CHANGED;
    readonly MESSAGE_SENT: PushUpdateEventType.MESSAGE_SENT;
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
    readonly MESSAGE_PREVIEW_CREATED: PushUpdateEventType.MESSAGE_PREVIEW_CREATED;
    readonly EVENT_IN_S3: PushUpdateEventType.EVENT_IN_S3;
};

export declare interface ChatEventData {
    context?: [] | PushUpdateContext;
    createdAt: Date;
    createdAtWithMilliseconds?: Date;
    data: unknown;
    error?: MessageFailedEventData['error'];
    id: string;
    type?: ChatEventType;
}

declare type ChatEventKey = keyof typeof ChatEvent;

export declare type ChatEventType = typeof ChatEvent[ChatEventKey];

declare class ChatSdk {
    #private;
    onError?: (error: Error) => void;
    onRawEvent?: (event: ChatCustomEvent) => void;
    isLivechat: boolean | undefined;
    channelId: ChannelId;
    constructor(options: ChatSDKOptions);
    /**
     * Initiate a WebSocket connection
     * @param authorizationCode - authorization code
     * @returns Promise<boolean> - true if the connection was created, false if the connection already exists
     * @throws ChatSDKError
     */
    connect(authorizationCode?: string): Promise<boolean>;
    ready(): Promise<void>;
    /**
     * Get channel info
     * Returns channel info like feature toggle status, translations, file upload restrictions, theme color settings etc.
     * @returns ChannelInfo
     * @throws ChatSDKError
     */
    getChannelInfo(): Promise<ChannelInfo>;
    /**
     * Get channel availability
     * Returns channel availability Online/Offline
     * @returns ChannelAvailabilityResponse
     * @throws ChatSDKError
     */
    getChannelAvailability(): Promise<ChannelAvailabilityResponse>;
    /**
     * Send Authorization Event
     * @deprecated - use Secured Session flow instead (SDK option `securedSession` and {@link ChatSdk.connect})
     * @param authorizationCode - authorization code
     * @param visitorId - visitor id
     * @param browserFingerprint - BrowserFingerprint object, use getBrowserFingerprint helper function to create it
     * @throws AuthorizationError
     *  * This exception is thrown when the authorization or refresh token fails
     */
    authorize(authorizationCode?: string, visitorId?: VisitorId, browserFingerprint?: BrowserFingerprint): Promise<ConsumerAuthorizationSuccessPayloadData | CustomerReconnectSuccessPayloadData>;
    /**
     * Generate Authorization Token from the given url
     *
     * @param threadIdOnExternalPlatform - Thread Id
     * @param url - Authorization Service URL
     */
    generateAuthorizationToken(threadIdOnExternalPlatform: ThreadIdOnExternalPlatform, url: string): Promise<AuthorizationToken>;
    /**
     * Register handler to chat event
     *
     * @param type - type of chat event
     * @param handler - event handler
     * @returns function to unregister handler
     */
    onChatEvent(type: ChatEventType, handler: (event: ChatCustomEvent) => void): RemoveListenerFunction;
    /**
     * Get Customer instance
     */
    getCustomer(): Customer;
    /**
     * Get Thread instance by id
     * @param id - thread id
     * @returns instance of thread based on channel settings
     */
    getThread(id: ThreadIdOnExternalPlatform): Thread | LivechatThread;
    /**
     * Get list of available threads
     * @returns list of threads
     */
    getThreadList(): Promise<Array<ThreadView> | null>;
    /**
     * Get access to a websocket connection
     * @returns WebSocketClient instance
     */
    getWebsocketClient(): WebSocketClient | null;
    /**
     * Send the Offline Message
     * @param offlineMessageData - offline message data (name, email, message)
     * @returns success
     * @throws SendMessageFailedError
     *  * This exception is thrown when a message fails to send. The error contains (`error.data`) a response from the backend with details.
     */
    sendOfflineMessage(offlineMessageData: OfflineMessageData): Promise<MessageSuccessEventData>;
    /**
     * Recover thread data
     * @param threadIdOnExternalPlatform - thread id on external platform
     * @returns thread session data
     * @throws ThreadRecoverFailedError
     *  * This exception is thrown when the recover fails or the thread does not exist.
     */
    recoverThreadData(threadIdOnExternalPlatform?: ThreadIdOnExternalPlatform | undefined): AbortablePromise<ThreadRecoveredChatEvent>;
    /**
     * Recover livechat thread data
     * @param threadIdOnExternalPlatform - thread id on external platform
     * @returns thread livechat session data
     * @throws ThreadRecoverFailedError
     *  * This exception is thrown when the recover fails or the thread does not exist.
     */
    recoverLivechatThreadData(threadIdOnExternalPlatform?: ThreadIdOnExternalPlatform | undefined): AbortablePromise<ThreadRecoveredChatEvent>;
    /**
     * Reset the ChatSdk session and clear it from customer data
     * - it disconnects the WS connection and creates a new one
     * - generates new IDs if not provided
     */
    resetSession(customerId?: CustomerIdentityIdOnExternalPlatform, customerName?: string, customerImage?: string, visitorId?: VisitorId, visitId?: VisitId): Promise<void>;
    _getContactCustomFieldsFromQueue(): CustomFieldsObject;
}
export { ChatSdk }
export default ChatSdk;

export declare class ChatSDKError extends Error {
    name: string;
    data: unknown;
    additionalInfo?: unknown;
    constructor(error: unknown, data?: unknown);
    private _getErrorMessage;
}

export declare type ChatSDKOptions = ChatSDKOptionsDefinedEnvironment | ChatSDKOptionsCustomEnvironment;

declare interface ChatSDKOptionsBase {
    appName?: string;
    appVersion?: string | number;
    authorizationCode?: string;
    brandId: BrandId;
    cacheStorage: ICacheStorage | null;
    channelId: ChannelId;
    customerId?: CustomerIdentityIdOnExternalPlatform;
    customerImage?: string;
    customerName?: string;
    destinationId?: DestinationInput['id'];
    isAuthorizationEnabled?: boolean;
    isClientSideEventsThrottlingEnabled?: boolean;
    isLivechat?: boolean;
    language?: string;
    onError?: (error: Error) => void;
    onRawEvent?: (event: ChatCustomEvent) => void;
    securedSession?: SecureSessionsType;
    visitId?: VisitId;
    visitorId?: VisitorId;
}

declare interface ChatSDKOptionsCustomEnvironment extends ChatSDKOptionsBase {
    customEnvironment: EnvironmentEndpoints;
    environment: EnvironmentName.custom;
}

declare interface ChatSDKOptionsDefinedEnvironment extends ChatSDKOptionsBase {
    environment: Exclude<EnvironmentName, EnvironmentName.custom>;
}

declare type ChatWindowId = Flavor<string, 'ChatWindowId'>;

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

export declare interface Contact {
    authorEndUserIdentity: EndUserIdentity | null;
    channelId: ChannelId;
    consumerContactStorageId: string;
    contactId: string;
    customFields: Array<CustomField>;
    customerContactId: string;
    customerStatistics: CustomerStatistics;
    detailUrl: string;
    id: ContactNumber;
    inboxAssignee: UserId | null;
    inboxAssigneeLastAssignedAt: string | null;
    inboxAssigneeUser: User | null;
    inboxPreAssigneeUser: User | null;
    interactionId: string;
    ownerAssignee: UserId | null;
    ownerAssigneeUser: User | null;
    recipients: Array<Recipient>;
    routingQueueId: RoutingQueueId | null;
    routingQueuePriority: number;
    status: ContactStatus;
    statusUpdatedAt: string;
    threadId: ThreadId;
    threadIdOnExternalPlatform: ThreadIdOnExternalPlatform;
    userStatistics: {
        unseenMessagesCount: number;
    };
    endUser: EndUser | null;
    createdAt: string;
}

export declare interface ContactCreatedChatEvent extends ChatEventData {
    data: ContactCreatedData;
    type: typeof ChatEvent.CONTACT_CREATED;
}

export declare type ContactCreatedData = CaseCreatedData;

declare type ContactNumber = Flavor<string, 'ContactNumber'>;

export declare interface ContactRecipientsChangedChatEvent extends ChatEventData {
    data: ContactRecipientsChangedData;
    type: PushUpdateEventType.CONTACT_RECIPIENTS_CHANGED;
}

export declare type ContactRecipientsChangedData = Override<yup.InferType<typeof contactRecipientsChangedDataSchema>, {
    brand: Brand;
    channel: Channel;
    contact: Case;
}>;

declare const contactRecipientsChangedDataSchema: yup.ObjectSchema<{
    brand: object & {
        id: any;
        tenantId: any;
        businessUnitId: any;
        timezone: any;
        friendlyName: any;
    };
    contact: object & {
        id: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        consumerContactStorageId: any;
        createdAt: any;
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
        routableType: any;
        proficiency: any;
        interactionId: any;
        contactId: any;
        customerContactId: any;
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
        isTrackingMessageDeliveryStatus: any;
        mediaType: any;
        nicknameOnExternalPlatform: any;
        ownerUserId: any;
        replyPrefixMentionTemplate: any;
        studioScript: any;
        translationGroup: any;
        wysiwygEnabled: any;
        pointOfContactId: any;
        channelNumber: any;
    };
}>;

declare enum ContactRoutableType {
    ROUTABLE = "ROUTABLE",
    NOT_ROUTABLE = "NOT_ROUTABLE"
}

declare enum ContactRoutingMode {
    FINDMATCH = "findmatch",
    RESOLVER = "resolver",
    LEGACY = "legacy"
}

export declare enum ContactStatus {
    NEW = "new",
    OPEN = "open",
    PENDING = "pending",
    ESCALATED = "escalated",
    RESOLVED = "resolved",
    CLOSED = "closed",
    TRASHED = "trashed"
}

export declare interface ContactStatusChangedChatEvent extends ChatEventData {
    data: ContactStatusChangedData;
    type: typeof ChatEvent.CONTACT_STATUS_CHANGED;
}

export declare type ContactStatusChangedData = CaseStatusChangedData;

declare type ContactStorageId = Flavor<string, 'ContactStorageId'>;

export declare interface ContactToRoutingQueueAssignmentChangedChatEvent extends ChatEventData {
    data: ContactToRoutingQueueAssignmentChangedData;
    type: typeof ChatEvent.CONTACT_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED;
}

declare type ContactToRoutingQueueAssignmentChangedData = Override<yup.InferType<typeof contactToRoutingQueueAssignmentChangedEventDataSchema>, {
    brand: Brand;
    case: Case;
    channel: Channel;
    routingQueue: RoutingQueue | null;
    routingMode?: ContactRoutingMode;
    previousRoutingQueue: RoutingQueue | null;
    preferredUserForNextAssign?: User | null;
}>;

declare const contactToRoutingQueueAssignmentChangedEventDataSchema: yup.ObjectSchema<{
    brand: object & {
        id: any;
        tenantId: any;
        businessUnitId: any;
        timezone: any;
        friendlyName: any;
    };
    case: object & {
        id: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        consumerContactStorageId: any;
        createdAt: any;
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
        routableType: any;
        proficiency: any;
        interactionId: any;
        contactId: any;
        customerContactId: any;
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
        isTrackingMessageDeliveryStatus: any;
        mediaType: any;
        nicknameOnExternalPlatform: any;
        ownerUserId: any;
        replyPrefixMentionTemplate: any;
        studioScript: any;
        translationGroup: any;
        wysiwygEnabled: any;
        pointOfContactId: any;
        channelNumber: any;
    };
    routingQueue: (object & {
        id: any;
        name: any;
        isSubqueue: any;
        isDeleted: any;
        skillId: any;
        isAcceptRejectFlowEnabled: any;
        acceptRejectFlowRefusalTimeoutInSeconds: any;
    }) | null;
    routingMode: string | undefined;
    previousRoutingQueue: (object & {
        id: any;
        name: any;
        isSubqueue: any;
        isDeleted: any;
        skillId: any;
        isAcceptRejectFlowEnabled: any;
        acceptRejectFlowRefusalTimeoutInSeconds: any;
    }) | null;
    preferredUserForNextAssign: yup.Shape<object | null | undefined, {
        id: any;
        incontactId: any;
        agentId: any;
        emailAddress: any;
        loginUsername: any;
        firstName: any;
        surname: any;
        nickname: any;
        isBotUser: any;
        isSurveyUser: any;
        imageUrl: any;
        publicImageUrl: any;
    }>;
}>;

declare enum ContentFormat {
    PLAIN = "plain",
    HTML = "html"
}

declare type ContentRemoved = yup.InferType<typeof contentRemovedSchema>;

declare const contentRemovedSchema: yup.ObjectSchema<{
    reason: string;
    removedAt: Date;
}>;

/**
 * Consult the [W3C CSP documentation](https://www.w3.org/TR/CSP3/#csp-directives)
 * for more information on the available directives.
 */
declare interface ContentSecurityPolicyDirectives {
    'default-src'?: DirectiveValue;
    'script-src'?: DirectiveValue;
    'style-src'?: DirectiveValue;
    [key: string]: DirectiveValue;
}

export declare const createAttachmentPayload: (file: File, brandId: BrandId, channelId: ChannelId, abortSignal?: AbortSignal) => Promise<AttachmentUpload>;

export declare const createAttachmentUploadMessageData: (files: FileList | Array<File> | Array<AttachmentUpload>, threadIdOnExternalPlatform: ThreadIdOnExternalPlatform, options?: SendMessageOptions) => Promise<SendMessageEventData>;

export declare function createCreateInvitationToGroupChatPayloadData(id: CaseId): EventPayloadData<CreateInvitationToGroupChatEventData>;

declare interface CreateInvitationToGroupChatEventData extends AwsInputEventData {
    contact: {
        id: ContactNumber;
    };
}

export declare function createJoinGroupChatPayloadData(code: string): EventPayloadData<JoinGroupChatEventData>;

export declare function createLeaveGroupChatPayloadData(id: CaseId): EventPayloadData<LeaveGroupChatEventData>;

export declare function createReconnectPayloadData(accessToken: AccessToken, visitorId: VisitorId): EventPayloadData<ReconnectConsumerData>;

export declare function createSendEmailInvitationToGroupChatPayloadData(caseId: CaseId, invitationCode: string, email: string): EventPayloadData<SendEmailInvitationToGroupChatEventData>;

export declare const createTemporaryAttachmentsUpload: (files: FileList | Array<File>, brandId: BrandId, channelId: ChannelId, abortSignal?: AbortSignal) => Promise<Array<AttachmentUpload>>;

export declare class Customer {
    #private;
    id: CustomerIdentityIdOnExternalPlatform | null;
    name: string | null;
    image: string | null;
    constructor(id?: CustomerIdentityIdOnExternalPlatform, name?: string, image?: string, websocketClient?: WebSocketClient | null);
    getIdOrCreateNewOne(): CustomerIdentityIdOnExternalPlatform;
    destroy(): void;
    getId(): CustomerIdentityIdOnExternalPlatform | null;
    setId(customerIdentityIdOnExternalPlatform: CustomerIdentityIdOnExternalPlatform): void;
    getName(): string | null;
    setName(name: string): void;
    getImage(): string | null;
    setImage(image: string): void;
    setExists(exists: boolean): void;
    setWebsocketClient(websocketClient: WebSocketClient): void;
    /**
     * Set Customer Custom field
     * @param name - Custom field name
     * @param value - Custom field value
     */
    setCustomField(name: CustomField['ident'], value: CustomField['value']): Promise<ChatEventData> | undefined;
    /**
     * Set Customer Custom fields
     * @param customFields - custom fields object
     * @example setCustomFields(\{ identName: 'value', identName2: 'value2' \})
     */
    setCustomFields(customFields: CustomFieldsObject): Promise<ChatEventData> | undefined;
    /**
     * Get Customer Custom fields (as object)
     */
    getCustomFields(): CustomFieldsObject;
    /**
     * Set Customer Custom fields from an array of custom fields
     * @param customFields - custom fields array
     */
    setCustomFieldsFromArray(customFields: Array<CustomField>): void;
    /**
     * Get Customer Custom fields (as array of CustomField)
     */
    getCustomFieldsArray(): Array<CustomField>;
    /**
     * Send Customer Custom fields
     * - call this only after the first message or recover event
     * @returns Promise<ChatEventData>
     */
    sendCustomFields(): Promise<ChatEventData>;
}

export declare interface CustomerIdentity {
    idOnExternalPlatform: CustomerIdentityIdOnExternalPlatform;
    firstName?: string;
    lastName?: string;
    image?: string;
}

export declare type CustomerIdentityIdOnExternalPlatform = Flavor<string, 'CustomerIdentityIdOnExternalPlatform'>;

export declare interface CustomerReconnectSuccessPayloadData {
    reconnected: true;
}

declare const customerSchema: yup.ObjectSchema<{
    firstName: string;
    lastName: string;
    fullName: string;
    customFields: {
        ident: any;
        value: any;
    }[];
}>;

declare interface CustomerStatistics {
    unseenMessagesCount: number;
}

export declare type CustomerView = Override<yup.InferType<typeof customerSchema>, {
    customFields: Array<CustomField>;
}>;

declare type CustomField = yup.InferType<typeof customFieldSchema>;

declare type CustomFieldDefinition = {
    ident: string;
    label: string;
    type: CustomFieldType;
    required: boolean;
    values: Array<CustomFieldDefinitionPossibleValue>;
    liveChatVisibility: 'visible' | 'hidden';
    postDetailVisibility: 'visible' | 'hidden';
    isEditable: boolean;
    autocompleteAttribute?: string;
} & CustomFieldDefinitionTranslation;

declare type CustomFieldDefinitionPossibleValue = {
    label?: string;
    name: string;
    value: string;
    parentId?: string;
} & CustomFieldDefinitionTranslation;

declare interface CustomFieldDefinitionTranslation {
    labelTranslationKey?: string;
    ariaLabelTranslationKey?: string;
}

declare const customFieldSchema: yup.ObjectSchema<{
    ident: string;
    value: string | null;
}>;

declare type CustomFieldsMap = Map<Ident, Value>;

export declare type CustomFieldsObject = Record<Ident, Value>;

declare enum CustomFieldType {
    TEXT = "text",
    EMAIL = "email",
    LIST = "list",
    TREE = "tree"
}

declare interface DestinationInput {
    id: ChatWindowId;
}

declare enum DeviceType {
    DESKTOP = "desktop",
    MOBILE = "mobile",
    OTHER = "other",
    TABLET = "tablet"
}

declare type DirectiveValue = Array<string> | undefined;

declare type EndUser = yup.InferType<typeof endUserSchema> & {
    id: EndUserIdentityId;
};

declare type EndUserIdentity = Override<yup.InferType<typeof endUserIdentitySchema>, {
    id: EndUserIdentityId;
    idOnExternalPlatform: CustomerIdentityIdOnExternalPlatform;
}>;

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

declare const endUserSchema: yup.ObjectSchema<{
    id: string;
    firstName: string;
    surname: string;
    fullName: string;
}>;

export declare interface EnvironmentEndpoints {
    authorize: string;
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

declare type EventId = Flavor<string, 'eventId'>;

export declare type EventListenerFunction = (event: ChatCustomEvent) => void;

export declare interface EventPayloadData<D extends AwsInputEventData> {
    consumerIdentity?: CustomerIdentity;
    data: D;
    destination?: DestinationInput;
    eventType: AwsInputEventType;
    visit?: VisitInput;
    visitor?: VisitorInput;
}

declare interface FileRestrictionsSettings {
    allowedFileSize: string;
    allowedFileTypes: Array<{
        description: string;
        mimeType: string;
    }>;
    isAttachmentsEnabled: boolean;
}

declare type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;

declare interface Flavoring<FlavorT> {
    _type?: FlavorT;
}

declare type ForwardedMessageReference = {
    message: {
        id: MessageId;
    };
};

export declare function generateId(): string;

/**
 * Get message author name of given message
 * @param message - message
 * @returns message author name
 */
export declare const getAuthor: (message: Message) => string;

/**
 * Get Customer Browser fingerprint
 * @param options - options
 */
export declare const getBrowserFingerprint: (options?: BrowserFingerprintOptions) => BrowserFingerprint;

export declare const getBrowserLanguage: () => string;

export declare const getBrowserLocation: () => string;

export declare function getCustomFieldsArray(fields: CustomFieldsMap): Array<CustomField>;

export declare function getCustomFieldsFromArray(fields: Array<CustomField>): CustomFieldsObject;

/**
 * Get Device type
 * @param deviceType - device type
 */
export declare function getDeviceType(deviceType?: string): DeviceType;

export declare const getValidLanguage: (language: string) => string;

export declare interface ICacheStorage {
    getItem<T = unknown>(key: string): T | null;
    removeItem(key: string): void;
    setItem(key: string, data: unknown, ttl: number): void;
}

export declare interface IChatEventTarget extends EventTarget {
    addEventListener<K extends ChatEventType>(type: K, listener: (event: ChatCustomEvent) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
    dispatchEvent(event: ChatCustomEvent): boolean;
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener<K extends ChatEventType>(type: K, callback: (event: ChatCustomEvent) => void, options?: boolean | EventListenerOptions | undefined): void;
}

declare type Ident = CustomField['ident'];

declare type IdentityIdOnExternalPlatform = CustomerIdentityIdOnExternalPlatform | ChannelIdOnExternalPlatform;

declare type InboxAssigneeResponseTime = yup.InferType<typeof inboxAssigneeResponseTimeSchema>;

declare const inboxAssigneeResponseTimeSchema: yup.ObjectSchema<{
    valueInSeconds: number;
    slaInSeconds: number | null;
    slaEnabled: boolean;
    isRunning: boolean;
}>;

export declare class IpAddressBlockedError extends Error {
    name: string;
}

export declare function isAgentTypingEndedEvent(event: ChatEventData): event is AgentTypingEndedEvent;

export declare function isAgentTypingStartedEvent(event: ChatEventData): event is AgentTypingStartedEvent;

export declare function isAssignedAgentChangedEvent(event: ChatEventData): event is AssignedAgentChangedEvent;

export declare const isAttachmentUpload: (files: FileList | Array<File> | Array<AttachmentUpload>) => files is AttachmentUpload[];

export declare const isAuthSuccessEvent: (payload: ChatEventData) => payload is AuthorizeConsumerEventSuccessResponse;

export declare function isContactCreatedEvent(event: ChatEventData): event is ContactCreatedChatEvent;

export declare function isContactRecipientsChangedEvent(event: unknown): event is ContactRecipientsChangedChatEvent;

export declare function isContactStatusChangedEvent(event: ChatEventData): event is ContactStatusChangedChatEvent;

export declare function isContactToRoutingQueueAssignmentChangedEvent(event: ChatEventData): event is ContactToRoutingQueueAssignmentChangedChatEvent;

export declare function isCustomerReconnectSuccessPayloadData(payload: unknown): payload is CustomerReconnectSuccessPayloadData;

export declare const isLoadMetadataSuccessPayload: (response: ChatEventData) => response is LoadThreadMetadataChatEvent;

export declare function isMessage(item: unknown): item is Message;

export declare function isMessageCreatedEvent(event: unknown): event is MessageCreatedEvent;

export declare function isMessageReadChangedEvent(event: unknown): event is MessageReadChangedEvent;

export declare function isMessageSentEvent(event: unknown): event is MessageSentEvent;

export declare function isMoreMessagesLoadedEvent(event: ChatEventData): event is MoreMessagesLoadedEvent;

export declare const isRecoverSuccessEvent: (response: ChatEventData) => response is ThreadRecoveredChatEvent;

export declare const isSetPositionInQueueEvent: (event: unknown) => event is SetPositionInQueueChatEvent;

export declare function isThreadArchivedSuccessPayload(response: ChatEventData): response is ThreadArchivedEvent;

export declare const isThreadListFetchedPostbackData: (data: unknown) => data is ThreadListFetchedPostbackData;

export declare function isTokenRefreshedSuccessResponse(response: unknown): response is TokenRefreshedSuccessResponse;

export declare function isWindowClosing(): boolean;

declare interface JoinGroupChatEventData extends AwsInputEventData {
    invitation: {
        code: string;
    };
}

declare interface LeaveGroupChatEventData extends AwsInputEventData {
    contact: {
        id: CaseId;
    };
}

export declare class LivechatThread extends Thread {
    protected _isInitialized: boolean;
    protected _canSendMessage: boolean;
    constructor(idOnExternalPlatform: ThreadIdOnExternalPlatform, websocketClient: WebSocketClient, messageEmitter: IChatEventTarget, customer: Customer | null, customFields?: CustomFieldsObject, isAuthorizationEnabled?: boolean);
    /**
     * Recover existing live chat
     * @returns AbortablePromise ThreadRecoveredData
     * @throws ThreadRecoverFailedError
     *  * This exception is thrown when the recover fails or the thread does not exist.
     */
    recover(): AbortablePromise<ThreadRecoveredData>;
    sendMessage(messageData: SendMessageEventData): Promise<MessageSuccessEventData>;
    /**
     * Start livechat
     * @param initialMessageText - initial message text
     */
    startChat(initialMessageText?: string): Promise<MessageSuccessEventData | void>;
    endChat(): Promise<void>;
    /**
     * Load previous messages
     * @returns Promise MoreMessagesLoadedEvent | null
     * @throws LoadMoreMessagesFailedError
     *  * This exception is thrown when the attempt to load more messages fails.
     */
    loadMoreMessages(): Promise<MoreMessagesLoadedEvent | null>;
    private _registerLivechatEventHandlers;
}

export declare interface LoadThreadMetadataChatEvent extends ChatEventData {
    data: ThreadMetadataLoadedPostbackData;
    type: AwsResponseEventType.THREAD_METADATA_LOADED;
}

export declare type Message = Override<yup.InferType<typeof messageSchema>, {
    attachments: Array<Attachment>;
    authorEndUserIdentity: EndUserIdentity | null;
    authorNameRemoved: ContentRemoved;
    authorUser: User | null;
    contactNumber: ContactNumber;
    contentRemoved: ContentRemoved;
    delivered: Array<MessageDelivered>;
    direction: MessageDirection;
    forward?: ForwardedMessageReference;
    id: MessageId;
    idOnExternalPlatform: MessageIdOnExternalPlatform;
    messageContent: MessageContent;
    postId: PostId;
    recipients: Array<Recipient>;
    replyChannel: Channel | null;
    seen: Array<MessageSeen>;
    sentiment: Sentiment;
    tags: Array<Tag>;
    threadId: ThreadId;
    userStatistics: UserStatistics;
    user?: User;
    threadIdOnExternalPlatform: ThreadIdOnExternalPlatform;
    createdAtWithMilliseconds?: string;
}>;

declare type MessageContent = Override<yup.InferType<typeof messageContentSchema>, {
    type: MessageType;
    parameters?: MessageParameters;
    payload: MessagePayload_2;
}>;

declare const messageContentSchema: yup.ObjectSchema<{
    type: string;
    payload: object & {
        text: any;
        postback: any;
        elements: any;
    };
    postback: string | null | undefined;
    fallbackText: string | undefined;
    isAutoTranslated: boolean | undefined;
    parameters: [] | {
        isInitialMessage?: boolean | undefined;
    } | undefined;
}>;

export declare type MessageCreatedData = yup.InferType<typeof messageCreatedDataSchema> & {
    brand: Brand;
    message: Message;
    case: Case;
    channel: Channel;
    thread: ThreadView;
    agentContact?: AgentContact | null;
};

declare const messageCreatedDataSchema: yup.ObjectSchema<{
    brand: object & {
        id: any;
        tenantId: any;
        businessUnitId: any;
        timezone: any;
        friendlyName: any;
    };
    message: object & {
        id: any;
        idOnExternalPlatform: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        postId: any;
        contactNumber: any;
        forward: any;
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
        createdAtWithMilliseconds: any;
    };
    case: object & {
        id: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        consumerContactStorageId: any;
        createdAt: any;
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
        routableType: any;
        proficiency: any;
        interactionId: any;
        contactId: any;
        customerContactId: any;
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
        isTrackingMessageDeliveryStatus: any;
        mediaType: any;
        nicknameOnExternalPlatform: any;
        ownerUserId: any;
        replyPrefixMentionTemplate: any;
        studioScript: any;
        translationGroup: any;
        wysiwygEnabled: any;
        pointOfContactId: any;
        channelNumber: any;
    };
    thread: object & {
        id: any;
        idOnExternalPlatform: any;
        threadName: any;
        channelId: any;
        canAddMoreMessages: any;
    };
    agentContact: (object & {
        id: any;
        createdAt: any;
        user: any;
    }) | null;
}>;

export declare interface MessageCreatedEvent extends ChatEventData {
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

declare type MessageParameters = yup.InferType<typeof messageParametersSchema>;

declare const messageParametersSchema: yup.MixedSchema<[] | {
    isInitialMessage?: boolean | undefined;
}>;

declare type MessagePayload = {
    text?: string | null;
    postback?: Postback;
    elements?: Array<any> | null;
};

declare type MessagePayload_2 = yup.InferType<typeof messagePayloadSchema>;

declare const messagePayloadSchema: yup.ObjectSchema<object & {
    text: string | null;
    postback: string | null;
    elements: unknown[] | null;
}>;

declare type MessageReadChangedData = Override<yup.InferType<typeof messageReadChangedDataSchema>, {
    brand: Brand;
    message: Message;
    contact: Contact;
}>;

declare const messageReadChangedDataSchema: yup.ObjectSchema<{
    brand: {
        id: any;
        tenantId: any;
        businessUnitId: any;
        timezone: any;
        friendlyName: any;
    };
    message: {
        id: any;
        idOnExternalPlatform: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        postId: any;
        contactNumber: any;
        forward: any;
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
        createdAtWithMilliseconds: any;
    };
    contact: {
        id: any;
        threadId: any;
        threadIdOnExternalPlatform: any;
        consumerContactStorageId: any;
        createdAt: any;
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
        routableType: any;
        proficiency: any;
        interactionId: any;
        contactId: any;
        customerContactId: any;
    };
}>;

export declare interface MessageReadChangedEvent extends ChatEventData {
    data: MessageReadChangedData;
    type: PushUpdateEventType.MESSAGE_READ_CHANGED;
}

declare const messageSchema: yup.ObjectSchema<{
    id: string;
    idOnExternalPlatform: string;
    threadId: string;
    threadIdOnExternalPlatform: string;
    postId: string;
    contactNumber: string;
    forward: {
        message: any;
    } | null;
    replyToMessage: {
        id: any;
        idOnExternalPlatform: any;
    } | null;
    messageContent: object & {
        type: any;
        payload: any;
        postback: any;
        fallbackText: any;
        isAutoTranslated: any;
        parameters: any;
    };
    hasAdditionalMessageContent: boolean;
    reactionStatistics: object & {
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
        agentId: any;
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
        agentId: any;
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
        anonymizedAt: any;
        anonymizedReason: any;
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
        isTrackingMessageDeliveryStatus: any;
        mediaType: any;
        nicknameOnExternalPlatform: any;
        ownerUserId: any;
        replyPrefixMentionTemplate: any;
        studioScript: any;
        translationGroup: any;
        wysiwygEnabled: any;
        pointOfContactId: any;
        channelNumber: any;
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
    createdAtWithMilliseconds: string | null | undefined;
}>;

declare type MessageSeen = yup.InferType<typeof messageSeenSchema>;

declare const messageSeenSchema: yup.ObjectSchema<{
    userId: number;
    endUserId: string;
    seenAt: Date;
}>;

export declare type MessageSentData = Override<yup.InferType<typeof messageSentDataSchema>, {
    brand: Brand;
    message: SentMessage;
    thread: ThreadView;
}>;

declare const messageSentDataSchema: yup.ObjectSchema<{
    brand: {
        id: any;
        tenantId: any;
        businessUnitId: any;
        timezone: any;
        friendlyName: any;
    };
    message: {
        attachments: any;
        authorEndUserIdentity: any;
        authorUser: any;
        createdAt: any;
        direction: any;
        idOnExternalPlatform: any;
        messageContent: any;
        threadIdOnExternalPlatform: any;
    };
    thread: {
        id: any;
        idOnExternalPlatform: any;
        threadName: any;
        channelId: any;
        canAddMoreMessages: any;
    };
}>;

export declare interface MessageSentEvent extends ChatEventData {
    data: MessageSentData;
    type: PushUpdateEventType.MESSAGE_SENT;
}

export declare interface MessageSuccessEventData extends ChatEventData {
    id: string;
}

export declare enum MessageType {
    TEXT = "TEXT",
    FILE = "FILE",
    FORM = "FORM",
    PLUGIN = "PLUGIN",
    POSTBACK = "POSTBACK",
    QUICK_REPLIES = "QUICK_REPLIES",
    RICH_LINK = "RICH_LINK",
    LIST_PICKER = "LIST_PICKER",
    ADAPTIVE_CARD = "ADAPTIVE_CARD",
    TIME_PICKER = "TIME_PICKER"
}

export declare interface MoreMessagesLoadedEvent extends ChatEventData {
    data: MoreMessagesLoadedPostbackData;
}

declare interface MoreMessagesLoadedPostbackData extends AwsResponseEventPostbackData {
    messages: Message[];
    scrollToken: string;
    contactHistory: Array<PushUpdateEventFields>;
}

export declare interface OfflineMessageData {
    email: string;
    message: string;
    name: string;
}

declare type Override<T1, T2> = Omit<T1, keyof T2> & T2;

declare type Postback = string | null;

/** @deprecated use ContactStorageId */
declare type PostId = ThreadId;

declare type PreContactFormCustomField = {
    isRequired: boolean;
    definition: CustomFieldDefinition;
};

declare interface PushNotificationSettings {
    title: string;
    body: string;
    isActive: boolean;
    pinpointProjectId?: string;
    deeplink?: string;
}

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
    ROUTING = "routing",
    UNIFIED_ROUTING = "unifiedRouting"
}

declare type PushUpdateEventFields = Override<yup.InferType<typeof pushUpdateEventFieldsSchema>, {
    eventId: PushUpdateEventId;
    eventObject: PushUpdateEventObject;
    eventType: PushUpdateEventType;
    context?: PushUpdateContext | [];
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
    MESSAGE_NOTE = "MessageNote",
    MESSAGE_PREVIEW = "MessagePreview",
    S3_OBJECT = "S3Object"
}

declare enum PushUpdateEventType {
    AUTHORIZE_CONSUMER = "AuthorizeConsumer",
    /** @deprecated use CONTACT_CREATED */
    CASE_CREATED = "CaseCreated",
    /** @deprecated use ASSIGNED_AGENT_CHANGED */
    CASE_INBOX_ASSIGNEE_CHANGED = "CaseInboxAssigneeChanged",
    /** @deprecated use CONTACT_STATUS_CHANGED */
    CASE_STATUS_CHANGED = "CaseStatusChanged",
    /** @deprecated use CONTACT_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED */
    CASE_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED = "CaseToRoutingQueueAssignmentChanged",
    CONTACT_CREATED = "CaseCreated",
    ASSIGNED_AGENT_CHANGED = "CaseInboxAssigneeChanged",
    CONTACT_STATUS_CHANGED = "CaseStatusChanged",
    CONTACT_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED = "CaseToRoutingQueueAssignmentChanged",
    CONTACT_PREFERRED_USER_CHANGED = "ContactPreferredUserChanged",
    CONTACT_PROFICIENCY_CHANGED = "ContactProficiencyChanged",
    CONTACT_PRIORITY_CHANGED = "ContactPriorityChanged",
    CONTACT_SYNC = "ContactSync",
    CHANNEL_CREATED = "ChannelCreated",
    CHANNEL_DELETED = "ChannelDeleted",
    CHANNEL_UPDATED = "ChannelUpdated",
    MESSAGE_ADDED_INTO_CASE = "MessageAddedIntoCase",
    MESSAGE_CREATED = "MessageCreated",
    MESSAGE_DELIVERED_TO_END_USER = "MessageDeliveredToEndUser",
    MESSAGE_DELIVERED_TO_USER = "MessageDeliveredToUser",
    MESSAGE_DELIVERY_STATUS_CHANGED = "MessageDeliveryStatusChanged",
    MESSAGE_NOTE_CREATED = "MessageNoteCreated",
    MESSAGE_NOTE_UPDATED = "MessageNoteUpdated",
    MESSAGE_NOTE_DELETED = "MessageNoteDeleted",
    MESSAGE_READ_CHANGED = "MessageReadChanged",
    MESSAGE_SEEN_BY_END_USER = "MessageSeenByEndUser",
    MESSAGE_SEEN_BY_USER = "MessageSeenByUser",
    MESSAGE_SEEN_CHANGED = "MessageSeenChanged",
    MESSAGE_SENT = "MessageSent",
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
    CONTACT_RECIPIENTS_CHANGED = "ContactRecipientsChanged",
    MESSAGE_PREVIEW_CREATED = "MessagePreviewCreated",
    EVENT_IN_S3 = "EventInS3"
}

declare type Recipient = Override<yup.InferType<typeof recipientSchema>, {
    idOnExternalPlatform: IdentityIdOnExternalPlatform;
}>;

declare const recipientSchema: yup.ObjectSchema<{
    idOnExternalPlatform: string;
    name: string;
    isPrimary: boolean;
    isPrivate: boolean;
    anonymizedAt: string | null;
    anonymizedReason: string | null;
}>;

declare interface ReconnectConsumerData extends AwsInputEventData {
    accessToken: {
        token: string;
    } | null;
}

export declare const registerWindowUnload: () => void;

export declare type RemoveListenerFunction = () => void;

declare type RoutingQueue = yup.InferType<typeof routingQueueSchema> & {
    id: RoutingQueueId;
};

declare type RoutingQueueId = Flavor<string, 'RoutingQueueId'>;

declare const routingQueueSchema: yup.ObjectSchema<{
    id: string;
    name: string;
    isSubqueue: boolean;
    isDeleted: boolean;
    skillId: number | null | undefined;
    isAcceptRejectFlowEnabled: boolean | null | undefined;
    acceptRejectFlowRefusalTimeoutInSeconds: number | null | undefined;
}>;

export declare class SdkVersionNotSupported extends Error {
    name: string;
    message: string;
}

export declare enum SecureSessions {
    ANONYMOUS = "anonymous",
    SECURED_COOKIES = "securedCookies",
    THIRD_PARTY = "thirdParty"
}

export declare type SecureSessionsType = SecureSessions | null;

/**
 * Send chat event
 * @param payloadData - payload data
 * @param webSocketClient - websocket client
 */
export declare function sendChatEvent<D extends AwsInputEventData>(payloadData: EventPayloadData<D>, webSocketClient: WebSocketClient | null): Promise<ChatEventData>;

export declare function sendCreateInvitationToGroupChatEvent(createInvitationPayloadData: EventPayloadData<CreateInvitationToGroupChatEventData>, wsClient: WebSocketClient | null): Promise<ChatEventData>;

export declare function sendEmailInvitationToGroupChatEvent(createInvitationPayloadData: EventPayloadData<SendEmailInvitationToGroupChatEventData>, wsClient: WebSocketClient | null): Promise<ChatEventData>;

declare interface SendEmailInvitationToGroupChatEventData extends AwsInputEventData {
    contact: {
        id: ContactNumber;
    };
    invitation: {
        code: string;
    };
    recipients: Array<{
        idOnExternalPlatform: string;
    }>;
}

export declare function sendJoinGroupChatEvent(joinGroupChatPayloadData: EventPayloadData<JoinGroupChatEventData>, wsClient: WebSocketClient | null): Promise<ChatEventData>;

export declare function sendLeaveGroupChatEvent(leaveGroupChatPayloadData: EventPayloadData<LeaveGroupChatEventData>, wsClient: WebSocketClient | null): Promise<ChatEventData>;

export declare interface SendMessageEventData extends AwsInputEventData {
    accessToken?: {
        token: string;
    };
    thread: {
        idOnExternalPlatform: string;
        threadName?: string;
    };
    consumer: {
        customFields: Array<CustomField>;
    };
    consumerContact: {
        customFields: Array<CustomField>;
    };
    idOnExternalPlatform: MessageId;
    messageContent: {
        type: MessageType;
        payload: MessagePayload;
        postback?: Postback;
    };
    attachments: Array<AttachmentUpload>;
    browserFingerprint: BrowserFingerprint;
}

export declare class SendMessageFailedError extends ChatSDKError {
}

declare interface SendMessageOptions {
    browserFingerprint?: BrowserFingerprint;
    messageId?: MessageId;
}

declare interface SendOutboundEventData extends Omit<SendMessageEventData, 'consumer'> {
}

declare enum Sentiment {
    POSITIVE = "positive",
    NEUTRAL = "neutral",
    NEGATIVE = "negative"
}

declare type SentMessage = Override<yup.InferType<typeof sentMessageSchema>, {
    attachments: Array<Attachment>;
    authorEndUserIdentity: EndUserIdentity | null;
    authorUser: User | null;
    direction: MessageDirection;
    idOnExternalPlatform: MessageIdOnExternalPlatform;
    messageContent: MessageContent;
    threadIdOnExternalPlatform: ThreadIdOnExternalPlatform;
}>;

declare const sentMessageSchema: yup.ObjectSchema<{
    attachments: {
        friendlyName: any;
        securedPermanentUrl: any;
        url: any;
        mimeType: any;
        previewUrl: any;
        isInline: any;
        canBeStored: any;
        id: any;
    }[];
    authorEndUserIdentity: {
        id: any;
        idOnExternalPlatform: any;
        fullName: any;
        firstName: any;
        lastName: any;
        nickname: any;
        image: any;
    } | null;
    authorUser: {
        id: any;
        incontactId: any;
        agentId: any;
        emailAddress: any;
        loginUsername: any;
        firstName: any;
        surname: any;
        nickname: any;
        isBotUser: any;
        isSurveyUser: any;
        imageUrl: any;
        publicImageUrl: any;
    } | null;
    createdAt: string;
    direction: string;
    idOnExternalPlatform: string;
    messageContent: {
        type: any;
        payload: any;
        postback: any;
        fallbackText: any;
        isAutoTranslated: any;
        parameters: any;
    };
    threadIdOnExternalPlatform: string;
}>;

export declare interface SetPositionInQueueChatEvent extends ChatEventData {
    data: SetPositionInQueuePayloadData;
    id: EventId;
    type: AwsResponseEventType.SET_POSITION_IN_QUEUE;
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

declare type Tag = yup.InferType<typeof tagSchema> & {
    id: TagId;
};

declare type TagId = Flavor<number, 'TagId'>;

declare const tagSchema: yup.ObjectSchema<{
    id: number;
    color: string;
    title: string;
    isActive: boolean;
}>;

declare type TenantId = Flavor<string, 'TenantId'>;

export declare class Thread {
    idOnExternalPlatform: ThreadIdOnExternalPlatform;
    protected _websocketClient: WebSocketClient;
    protected _exists: boolean;
    protected _messageEmitter: IChatEventTarget;
    protected _typingTimeoutID: ReturnType<typeof setTimeout> | undefined;
    protected _isAuthorizationEnabled: boolean;
    protected _customer: Customer | null;
    protected _customFields: CustomFieldsMap;
    private _typingForPreviewTimeoutID;
    private _typingPreviewText;
    constructor(idOnExternalPlatform: ThreadIdOnExternalPlatform, websocketClient: WebSocketClient, messageEmitter: IChatEventTarget, customer: Customer | null, customFields?: CustomFieldsObject, isAuthorizationEnabled?: boolean);
    /**
     * Recover existing chat
     * @returns AbortablePromise<ThreadRecoveredData>
     * @throws ThreadRecoverFailedError
     *  * This exception is thrown when the recover fails or the thread does not exist.
     */
    recover(): AbortablePromise<ThreadRecoveredData>;
    /**
     * Send message
     * @param messageData - message data
     * @throws SendMessageFailedError
     *  * This exception is thrown when a message fails to send. The error can contain (`error.data`) a response from the backend with details.
     */
    sendMessage(messageData: SendMessageEventData): Promise<MessageSuccessEventData>;
    /**
     * Send text message
     * @param messageText - text of message
     * @param options - options
     */
    sendTextMessage(messageText: string, options?: SendMessageOptions): Promise<MessageSuccessEventData>;
    /**
     * Send postback message
     * @param postback - postback
     * @param messageText - text of message
     * @param options - options
     */
    sendPostbackMessage(postback: string, messageText: string, options?: SendMessageOptions): Promise<MessageSuccessEventData>;
    /**
     * Send Outbound Message
     * @param messageData - message data
     * @throws SendMessageFailedError
     *  * This exception is thrown when a message fails to send. The error contains (`error.data`) a response from the backend with details.
     */
    sendOutboundMessage(messageData: SendOutboundEventData): Promise<MessageSuccessEventData>;
    /**
     * Load previous messages
     * @returns Promise MoreMessagesLoadedEvent | null
     * @throws LoadMoreMessagesFailedError
     *  * This exception is thrown when the attempt to load more messages fails.
     */
    loadMoreMessages(): Promise<MoreMessagesLoadedEvent | null>;
    /**
     * Mark all messages in the thread as seen
     */
    lastMessageSeen(): Promise<ChatEventData>;
    /**
     * Send attachment
     *
     * Raw function to send attachments
     * @param files - An object of this type is returned by the files' property of the HTML <input> element; this lets you access the list of files selected with the <input type="file"> element.
     * @param options - options
     * @throws UploadAttachmentError
     *  * This exception is thrown when the file upload fails. The `error.data` contains information about allowed file size and types.
     */
    sendAttachments(files: FileList | Array<File> | Array<AttachmentUpload>, options?: SendMessageOptions): Promise<MessageSuccessEventData>;
    /**
     * Send start and stop typing events. It sends stop typing event after the timeout. Repeated calls resets this timeout.
     * @param timeout - The timeout in milliseconds.
     * @param onSendCallback - Callback to be called after the stop typing event is sent.
     */
    keystroke(timeout?: number, onSendCallback?: () => void): void;
    /**
     * Manually send the stop typing event and clear the keystroke timeout.
     */
    stopTyping(): void;
    private _stopTypingCallback;
    /**
     * Send typing event for message preview after the timeout.
     * @param currentText - current text
     * @param timeout - timeout in milliseconds
     * @returns void
     *
     */
    keystrokeForPreview(currentText: string, timeout?: number): void;
    /**
     * Manually send the stop typing event for message preview and clear the keystroke timeout.
     * @param shouldSendPreview - should send preview
     * @returns void
     *
     */
    stopTypingForPreview(shouldSendPreview?: boolean): void;
    /**
     * Get Thread Metadata
     * @returns response otherwise throw an error response
     * @throws GetMetadataFailedError
     *  * This exception is thrown when getting thread metadata failed.
     */
    getMetadata(): Promise<LoadThreadMetadataChatEvent>;
    onThreadEvent(type: ChatEventType, handler: EventListenerFunction): RemoveListenerFunction;
    /**
     * Send current Custom Fields
     * @param selectedFieldIdents - it will send only custom fields with these IDs, if provided. Otherwise, it will send all custom fields.
     */
    sendCustomFields(selectedFieldIdents?: Array<CustomField['ident']>): Promise<ChatEventData>;
    /**
     * Set thread custom fields and send them
     * @param customFields - custom fields object
     * @example \{ ident: 'value' \}
     */
    setCustomFields(customFields: CustomFieldsObject): Promise<void>;
    /**
     * Remove thread custom fields
     * @param ident - custom field ident
     */
    removeCustomField(ident: CustomField['ident']): void;
    /**
     * Set thread custom field
     * @param ident - custom field name
     * @param value - custom field value
     */
    setCustomField(ident: CustomField['ident'], value: CustomField['value']): Promise<void>;
    /**
     * Set thread as archived
     * @returns Promise true
     * @throws ArchiveThreadFailedError
     *  * This exception is thrown when the archive thread failed.
     */
    archive(): Promise<true>;
    /**
     * Set thread name
     * @param name - New name of the Thread
     * @returns Promise true
     * @throws SetThreadNameFailedError
     *  * This exception is thrown when the set thread name failed.
     */
    setName(name: string): Promise<true>;
    /**
     * Send message preview
     * @param text - text
     */
    sendMessagePreview(text: string): Promise<void>;
    /**
     * Send conversation transcript to email
     */
    sendTranscript(contactNumber: ContactNumber, email: string): Promise<ChatEventData>;
    protected _setThreadAndCustomerExists(): void;
    protected _clearCustomFieldsOnContactStatusChangedToClosed(event: ChatCustomEvent): void;
    private _mergeCustomFieldsWithMessageData;
    private _mergeAccessTokenWithMessageData;
    private _mergeCustomFieldsAndAccessTokenWithMessageData;
    private _registerEventHandlers;
}

declare interface ThreadArchivedEvent extends ChatEventData {
    type: AwsResponseEventType.THREAD_ARCHIVED;
}

declare type ThreadId = Flavor<string, 'ThreadId'>;

export declare type ThreadIdOnExternalPlatform = Flavor<string, 'ThreadIdOnExternalPlatform'>;

declare interface ThreadListFetchedPostbackData extends AwsResponseEventPostbackData {
    threads: ThreadView[];
}

export declare interface ThreadMetadataLoadedPostbackData extends AwsResponseEventPostbackData {
    lastMessage: Message;
    ownerAssignee: User;
}

export declare interface ThreadRecoveredChatEvent extends ChatEventData {
    data: ThreadRecoveredData;
}

export declare interface ThreadRecoveredData extends Omit<ThreadRecoveredPostbackData, 'contactHistory'> {
    contactHistory: Array<ChatEventData>;
}

export declare interface ThreadRecoveredPostbackData extends AwsResponseEventPostbackData {
    contact: Contact;
    ownerAssignee: UserFromApiData | null;
    inboxAssignee: UserFromApiData | null;
    messages: Array<Message>;
    messagesScrollToken: string;
    thread: {
        id: ThreadId;
        idOnExternalPlatform: string;
        threadName: string;
    };
    contactHistory: Array<PushUpdateEventFields>;
    customer: CustomerView;
}

export declare class ThreadRecoverFailedError extends ChatSDKError {
}

declare const threadSchema: yup.ObjectSchema<{
    id: string;
    idOnExternalPlatform: string;
    threadName: string;
    channelId: string;
    canAddMoreMessages: boolean | null;
}>;

export declare type ThreadView = yup.InferType<typeof threadSchema> & {
    id: ThreadId;
    idOnExternalPlatform: ThreadIdOnExternalPlatform;
    channelId?: ChannelId;
    canAddMoreMessages: boolean;
};

declare interface TokenRefreshedPostbackData extends AwsResponseEventPostbackData {
    accessToken: AccessToken;
}

declare interface TokenRefreshedSuccessResponse {
    data: TokenRefreshedPostbackData;
    type: AwsResponseEventType.TOKEN_REFRESHED;
}

declare interface TypingEventData {
    brand: Brand;
    channel: Channel;
    thread: ThreadView;
    user?: User;
    direction?: 'inbound' | 'outbound';
}

export declare class UploadAttachmentError extends ChatSDKError {
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
    image: string;
    imagePublic: string;
    nickname: string | null;
    surname: string;
}

declare type UserId = Flavor<number, 'UserId'>;

declare const userSchema: yup.ObjectSchema<{
    id: number;
    incontactId: string | null;
    agentId: number | null | undefined;
    emailAddress: string;
    loginUsername: string;
    firstName: string;
    surname: string;
    nickname: string | null | undefined;
    isBotUser: boolean;
    isSurveyUser: boolean;
    imageUrl: string | undefined;
    publicImageUrl: string | undefined;
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

declare type Value = CustomField['value'];

declare type VisitId = Flavor<string, 'VisitId'>;

declare interface VisitInput {
    id: VisitId;
}

declare type VisitorId = Flavor<string, 'VisitorId'>;

declare interface VisitorInput {
    id: VisitorId;
}

declare interface WebSecurityConfiguration {
    contentSecurityPolicy?: ContentSecurityPolicyDirectives;
}

/**
 * Websocket client
 */
export declare class WebSocketClient {
    #private;
    private onError;
    private socketURLGetter;
    constructor(onError: ((error: Error) => void) | undefined, socketURLGetter: () => Promise<string>);
    /**
     * Connect websocket
     */
    connect(): Promise<void>;
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
     * @param data - data to send
     */
    send(data: unknown): void;
    /**
     * Register event handler to websocket event
     * @param eventType - websocket event
     * @param handlerCallback - event handler
     */
    on(eventType: WebSocketClientEvent, handlerCallback: (event: ChatCustomEvent) => void): void;
    /**
     * Unregister event handler to websocket event
     * @param eventType - websocket event
     * @param handlerCallback - event handler
     */
    off(eventType: WebSocketClientEvent, handlerCallback: (event: CustomEvent) => void): void;
    /**
     * Handle error from event listeners with onError callback or throw error
     */
    private _errorHandler;
}

export declare class WebSocketClientError extends Error {
    name: string;
    constructor(message: string, reason?: string);
}

export declare enum WebSocketClientEvent {
    CLOSE = "close",
    ERROR = "error",
    MESSAGE = "message",
    OPEN = "open",
    AUTHORIZATION_FAILED = "authorizationFailed"
}

export { }
