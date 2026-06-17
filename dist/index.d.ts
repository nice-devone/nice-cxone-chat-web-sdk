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

declare type ActionType = Flavor<string, 'ActionType'>;

export declare type Agent = User;

declare interface AgentContact {
    id: string;
    createdAt: string;
    createdAtWithMilliseconds: string;
    user: User_2;
}

export declare type AgentId = UserId;

export declare type AgentTypingEndedData = SenderTypingStartedData;

export declare interface AgentTypingEndedEvent extends ChatEventData {
    data: AgentTypingEndedData;
    type: typeof ChatEvent.AGENT_TYPING_ENDED;
}

export declare type AgentTypingStartedData = SenderTypingStartedData;

export declare interface AgentTypingStartedEvent extends ChatEventData {
    data: AgentTypingStartedData;
    type: typeof ChatEvent.AGENT_TYPING_STARTED;
}

declare enum ApplicationType {
    BROWSER = "browser"
}

export declare type AssignedAgentChangedData = CaseInboxAssigneeChangedData;

export declare interface AssignedAgentChangedEvent extends ChatEventData {
    data: CaseInboxAssigneeChangedData;
    type: typeof ChatEvent.ASSIGNED_AGENT_CHANGED;
}

export declare interface Attachment {
    id: AttachmentId;
    friendlyName: string;
    securedPermanentUrl: string;
    url: string;
    mimeType: string;
    previewUrl: string | null;
    isInline: boolean;
    canBeStored: boolean;
}

export declare type AttachmentId = Flavor<string, 'AttachmentId'>;

declare type AttachmentUpload = {
    url: string;
    friendlyName: string;
};

export declare type AuthorizationCallback = (status: 'success' | 'error', response: Partial<TransactionTokenResponse>) => void;

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

declare interface Brand {
    businessUnitId: number | null;
    friendlyName: string;
    id: BrandId;
    tenantId: TenantId | null;
    timezone: string | null;
}

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
 * @param keyPrefix - Optional key prefix
 */
declare class CacheStorage_2 implements ICacheStorage {
    #private;
    /**
     * Create a new CacheStorage instance
     * @param storage - storage instance
     * @param keyPrefix - Optional key prefix for storage keys
     * @throws CacheStorageError
     */
    constructor(storage: Storage, keyPrefix?: string);
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

export declare type Case = Omit<Case_2, 'inboxAssigneeUser' | 'inboxPreAssigneeUser' | 'ownerAssigneeUser' | 'targetedUser'> & {
    inboxAssigneeUser?: User | null;
    inboxPreAssigneeUser?: User | null;
    ownerAssigneeUser?: User | null;
    targetedUser?: User | null;
};

declare interface Case_2 {
    acceleration?: number;
    authorEndUserIdentity?: EndUserIdentity;
    consumerContactStorageId: ContactStorageId;
    contactId: string;
    createdAt: string;
    createdAtWithMilliseconds?: string | null;
    customerContactId?: string | null;
    customFields: Array<CustomField>;
    detailUrl: string;
    direction: CaseDirection;
    divisionNumber?: number | null;
    endUserRecipients: Array<Recipient>;
    endUser: CustomerView;
    id: CaseId;
    inboxAssignee?: number;
    inboxAssigneeUser?: User_2 | null;
    inboxPreAssigneeUser?: User_2 | null;
    interactionId: string;
    maximumPriority?: number;
    ownerAssignee?: number;
    ownerAssigneeUser?: User_2 | null;
    proficiency: Proficiency;
    recipients: Array<Recipient>;
    recipientsCustomers?: Array<RecipientCustomer>;
    routableType?: ContactRoutableType;
    routingAttribute?: number;
    routingQueueId?: RoutingQueueId;
    routingQueuePriority: number;
    statistics: Statistics;
    status: ContactStatus;
    targetedUser?: User_2 | null;
    threadId: ThreadId;
    threadIdOnExternalPlatform: ThreadIdOnExternalPlatform;
}

declare interface CaseCreatedData {
    brand: Brand;
    case: Case_2;
    channel: Channel;
    preferredUserForNextAssign?: User_2 | null;
    routingMode?: ContactRoutingMode;
    routingQueue?: RoutingQueue | null;
    thread: ThreadView;
}

/**
 * CaseCreated event with privacy filtering support.
 */
declare interface CaseCreatedData_2 extends Omit<CaseCreatedEvent_2['data'], 'case' | 'preferredUserForNextAssign'> {
    case: Case;
    preferredUserForNextAssign?: User | null;
}

declare interface CaseCreatedEvent extends Omit<CaseCreatedEvent_2, 'data'> {
    data: CaseCreatedData_2;
}

declare interface CaseCreatedEvent_2 extends PushUpdateEventFields {
    data: CaseCreatedData;
    eventObject: PushUpdateEventObject.CASE;
    eventType: PushUpdateEventType.CASE_CREATED;
}

declare enum CaseDirection {
    INBOUND = "inbound",
    OUTBOUND = "outbound"
}

declare type CaseId = ContactNumber;

declare interface CaseInboxAssigneeChangedData extends Omit<CaseInboxAssigneeChangedEvent['data'], 'case' | 'inboxAssignee' | 'previousInboxAssignee' | 'preferredUserForNextAssign'> {
    case: Case;
    inboxAssignee: User | null;
    previousInboxAssignee: User | null;
    preferredUserForNextAssign?: User | null;
}

declare interface CaseInboxAssigneeChangedData_2 {
    acceptRejectFlow?: {
        isEnabled: boolean;
        isTransfer?: boolean | null;
        refusalTimeoutSeconds: number | null;
    } | null;
    brand: Brand;
    case: Case_2;
    channel: Channel;
    inboxAssignee: User_2 | null;
    preferredUserForNextAssign?: User_2 | null;
    previousInboxAssignee: User_2 | null;
    routingMode?: ContactRoutingMode;
    routingQueue: RoutingQueue | null;
}

declare interface CaseInboxAssigneeChangedEvent extends PushUpdateEventFields {
    data: CaseInboxAssigneeChangedData_2;
    eventObject: PushUpdateEventObject.CASE;
    eventType: PushUpdateEventType.CASE_INBOX_ASSIGNEE_CHANGED;
}

declare interface CaseInboxAssigneeChangedEvent_2 extends Omit<CaseInboxAssigneeChangedEvent, 'data'> {
    data: CaseInboxAssigneeChangedData;
}

declare interface CaseStatusChangedData {
    agentContact?: AgentContact | null;
    brand: Brand;
    case: Case_2;
    channel: Channel;
    preferredUserForNextAssign?: User_2 | null;
    routingMode?: ContactRoutingMode;
    routingQueue?: RoutingQueue | null;
}

/**
 * CaseStatusChanged event with privacy filtering support.
 */
declare interface CaseStatusChangedData_2 extends Omit<CaseStatusChangedEvent_2['data'], 'case' | 'preferredUserForNextAssign'> {
    case: Case;
    preferredUserForNextAssign?: User | null;
}

declare interface CaseStatusChangedEvent extends Omit<CaseStatusChangedEvent_2, 'data'> {
    data: CaseStatusChangedData_2;
}

declare interface CaseStatusChangedEvent_2 extends PushUpdateEventFields {
    data: CaseStatusChangedData;
    eventObject: PushUpdateEventObject.CASE;
    eventType: PushUpdateEventType.CASE_STATUS_CHANGED;
}

/** @deprecated in favor to ContactToRoutingQueueAssignmentChangedEvent */
declare type CaseToRoutingQueueAssignmentChangedEvent = ContactToRoutingQueueAssignmentChangedEvent;

declare interface Channel {
    canAgentInviteCustomersToContact?: boolean;
    canReplyToAnyMessage?: boolean;
    canSaveResponse?: boolean;
    channelIntegrationId?: string;
    channelNumber?: number | null;
    contentFormat?: ContentFormat;
    externalPlatformAvatar: string;
    externalPlatformIcon?: string;
    hasAbilityToChangeFrom?: boolean;
    hasAbilityToChangeRecipient?: boolean;
    hasAbilityToDelete?: boolean;
    hasAbilityToForwardMessage?: boolean;
    hasAbilityToHide?: boolean;
    hasAbilityToLike?: boolean;
    hasAbilityToQuoteMessage?: boolean;
    hasAbilityToSendFiles?: boolean;
    hasAbilityToShare?: boolean;
    hasAbilityToTag?: boolean;
    hasCcAndBcc?: boolean;
    hasCustomerOnThirdParty?: boolean;
    hasEditableTitle?: boolean;
    hasMultipleRecipient?: boolean;
    hasMultipleThreadsPerEndUser?: boolean;
    hasOutboundFlow?: boolean;
    hasOutboundTemplates?: boolean;
    hasPostAsPlaceholder?: boolean;
    hasPublishing?: boolean;
    hasReply?: boolean;
    hasTreeStructure?: boolean;
    hasVisibleRecipients?: boolean;
    hasVisibleTitle?: boolean;
    id: ChannelId;
    idOnExternalPlatform: ChannelIdOnExternalPlatform;
    integrationBoxIdentifier?: string | null;
    isAutomaticSignatureAttached?: boolean;
    isCaseBasedStorage?: boolean;
    isDeleted?: boolean;
    isHidden?: boolean;
    isLiveChat?: boolean;
    isPostWritable?: boolean;
    isPrivate?: boolean;
    isTrackingMessageDeliveryStatus?: boolean;
    mediaType?: number;
    name: string;
    nicknameOnExternalPlatform?: string;
    ownerUserId?: number;
    pointOfContactId?: number | null;
    realExternalPlatformId: string;
    replyPrefixMentionTemplate?: string;
    studioScript?: string | null;
    translationGroup?: string;
    wysiwygEnabled?: boolean;
}

export declare enum ChannelAvailability {
    ONLINE = "online",
    OFFLINE = "offline"
}

export declare type ChannelAvailabilityOptions = ChannelAvailabilityOptionsWithEnvironment | ChannelAvailabilityOptionsWithCustomEnvironment;

declare interface ChannelAvailabilityOptionsBase {
    [key: string]: unknown;
    appName?: ChatSDKOptions['appName'];
    appVersion?: ChatSDKOptions['appVersion'];
    httpHeaders?: NetworkRequestMetadata['httpHeaders'];
}

declare interface ChannelAvailabilityOptionsWithCustomEnvironment extends ChannelAvailabilityOptionsBase {
    customEnvironment: EnvironmentEndpoints;
    environment: EnvironmentName.custom;
}

declare interface ChannelAvailabilityOptionsWithEnvironment extends ChannelAvailabilityOptionsBase {
    environment: Exclude<EnvironmentName, EnvironmentName.custom>;
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
    translationsLocale: string;
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
    chatExtendedLogging: boolean;
    chatSendPostbackAsTextMessage: boolean;
    disableAttachmentOnDfoChat: boolean;
    isCoBrowsingEnabled: boolean;
    isCreditCardMaskingEnabled: boolean;
    isFeatureImproveVisitorInactivityTrackingEnabled: boolean;
    isFeatureQueueCountingEnabled: boolean;
    isProactiveChatEnabled: boolean;
    isWebAnalyticsEnabled: boolean;
    liveChatLogoHidden: boolean;
    securedSessions: boolean;
    useStorageModuleInChat: boolean;
    cxoneMpowerNewLogo254: boolean;
    notificationSoundEnhancement: boolean;
}

export declare type ChannelInfoOptions = ChannelInfoOptionsWithEnvironment | ChannelInfoOptionsWithCustomEnvironment;

declare interface ChannelInfoOptionsBase {
    [key: string]: unknown;
    appName?: ChatSDKOptions['appName'];
    appVersion?: ChatSDKOptions['appVersion'];
    httpHeaders?: NetworkRequestMetadata['httpHeaders'];
}

declare interface ChannelInfoOptionsWithCustomEnvironment extends ChannelInfoOptionsBase {
    customEnvironment: EnvironmentEndpoints;
    environment: EnvironmentName.custom;
}

declare interface ChannelInfoOptionsWithEnvironment extends ChannelInfoOptionsBase {
    environment: Exclude<EnvironmentName, EnvironmentName.custom>;
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
    enablePersistentMenu?: boolean;
    chatRedesign: boolean;
    enableAiLabel?: boolean;
};

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
    readonly STREAMED_MESSAGE_STARTED: "StreamedMessageStarted";
    readonly STREAMED_MESSAGE_DELTA: "StreamedMessageDelta";
    readonly STREAMED_MESSAGE_FAILED: "StreamedMessageFailed";
    readonly STREAMED_MESSAGE_COMPLETED: "StreamedMessageCompleted";
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
    readonly CASE_CREATED: PushUpdateEventType_2.CASE_CREATED;
    readonly CASE_INBOX_ASSIGNEE_CHANGED: PushUpdateEventType_2.CASE_INBOX_ASSIGNEE_CHANGED;
    readonly CASE_STATUS_CHANGED: PushUpdateEventType_2.CASE_STATUS_CHANGED;
    readonly CASE_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED: PushUpdateEventType_2.CASE_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED;
    readonly CONTACT_INBOX_PRE_ASSIGNEE_CHANGED: PushUpdateEventType_2.CONTACT_INBOX_PRE_ASSIGNEE_CHANGED;
    readonly CONTACT_PREFERRED_USER_CHANGED: PushUpdateEventType_2.CONTACT_PREFERRED_USER_CHANGED;
    readonly CONTACT_RECIPIENTS_CHANGED: PushUpdateEventType_2.CONTACT_RECIPIENTS_CHANGED;
    readonly MESSAGE_ADDED_INTO_CASE: PushUpdateEventType_2.MESSAGE_ADDED_INTO_CASE;
    readonly MESSAGE_CREATED: PushUpdateEventType_2.MESSAGE_CREATED;
    readonly MESSAGE_DELIVERY_STATUS_CHANGED: PushUpdateEventType_2.MESSAGE_DELIVERY_STATUS_CHANGED;
    readonly MESSAGE_SEEN_CHANGED: PushUpdateEventType_2.MESSAGE_SEEN_CHANGED;
    readonly MESSAGE_READ_CHANGED: PushUpdateEventType_2.MESSAGE_READ_CHANGED;
    readonly MESSAGE_SENT: PushUpdateEventType_2.MESSAGE_SENT;
    readonly MESSAGE_UPDATED: PushUpdateEventType_2.MESSAGE_UPDATED;
    readonly PAGE_VIEW_CREATED: PushUpdateEventType_2.PAGE_VIEW_CREATED;
    readonly SENDER_TYPING_STARTED: PushUpdateEventType_2.SENDER_TYPING_STARTED;
    readonly SENDER_TYPING_ENDED: PushUpdateEventType_2.SENDER_TYPING_ENDED;
    readonly USER_STATUS_CHANGED: PushUpdateEventType_2.USER_STATUS_CHANGED;
    readonly FIRE_PROACTIVE: PushUpdateEventType_2.FIRE_PROACTIVE;
    readonly EVENT_IN_S3: PushUpdateEventType_2.EVENT_IN_S3;
};

export declare interface ChatEventData {
    context?: [] | PushUpdateContext;
    createdAt: string;
    createdAtWithMilliseconds?: string;
    data: unknown;
    error?: MessageFailedEventData['error'];
    id: string;
    type?: ChatEventType;
}

declare type ChatEventKey = keyof typeof ChatEvent;

export declare type ChatEventType = typeof ChatEvent[ChatEventKey];

declare class ChatSdk {
    #private;
    onAuthorization?: AuthorizationCallback;
    onError?: ErrorCallback_2;
    onRawEvent?: RawEventCallback;
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
     * Get persistent menu items configured for the channel.
     * @returns Array of PersistentMenuItem
     * @throws ChatSDKError
     */
    getPersistentMenuItems(): Promise<Array<PersistentMenuItem>>;
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
     * @deprecated the additional message content is handled internally, there is no need to use this method
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
    #private;
    name: string;
    data: unknown;
    additionalInfo?: unknown;
    constructor(error: unknown, data?: ChatSDKErrorData);
}

declare interface ChatSDKErrorData {
    [key: string]: unknown;
    /**
     * performance.now() delta from before the fetch() call to the catch.
     * Populated for fetch-originated errors only.
     */
    elapsedMs?: number;
    /**
     * Use for wrap original error cased by this error
     */
    error?: unknown;
    /**
     * navigator.onLine at the time of failure. `'unknown'` when navigator.onLine
     * was not readable. Populated for fetch-originated errors only.
     */
    navigatorOnLine?: boolean | 'unknown';
    /**
     * Categorical bucket for fetch-failure triage. Populated for fetch-
     * originated errors only.
     */
    probableCause?: ProbableFetchCause;
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
    identityToken?: string;
    isAuthorizationEnabled?: boolean;
    isLivechat?: boolean;
    isThirdPartyCookiesSupported?: boolean;
    language?: string;
    networkRequestMetadata?: NetworkRequestMetadata;
    onAuthorization?: AuthorizationCallback;
    onError?: ErrorCallback_2;
    onRawEvent?: RawEventCallback;
    securedSession?: SecureSessionsType;
    storage: IStorage | null;
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

export declare interface Contact extends Omit<Contact_2, 'inboxAssigneeUser' | 'inboxPreAssigneeUser' | 'ownerAssigneeUser' | 'targetedUser'> {
    inboxAssigneeUser: User | null;
    inboxPreAssigneeUser: User | null;
    ownerAssigneeUser: User | null;
    targetedUser?: User | null;
}

declare interface Contact_2 {
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
    inboxAssigneeUser: User_2 | null;
    inboxPreAssigneeUser: User_2 | null;
    interactionId: string;
    isDraft?: boolean;
    ownerAssignee: UserId | null;
    ownerAssigneeUser: User_2 | null;
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
    divisionNumber: number | null | undefined;
    acceleration: number | undefined;
    maximumPriority: number | undefined;
    routingAttribute: number | undefined;
    targetedUser: User_2 | null | undefined;
}

export declare interface ContactCreatedChatEvent extends ChatEventData {
    data: ContactCreatedData;
    type: typeof ChatEvent.CONTACT_CREATED;
}

export declare type ContactCreatedData = CaseCreatedData_2;

declare interface ContactInboxPreAssigneeChangedData {
    acceptRejectFlow?: {
        isEnabled: boolean;
        isTransfer?: boolean | null;
        refusalTimeoutSeconds: number | null;
    } | null;
    brand: Brand;
    channel: Channel;
    consumerContact: Case_2;
    inboxPreAssignee: User_2;
    preferredUserForNextAssign?: User_2 | null;
    routingMode?: ContactRoutingMode;
    routingQueue?: RoutingQueue | null;
}

/**
 * ContactInboxPreAssigneeChanged event with privacy filtering support.
 */
declare interface ContactInboxPreAssigneeChangedData_2 extends Omit<ContactInboxPreAssigneeChangedEvent_2['data'], 'case' | 'inboxPreAssignee' | 'preferredUserForNextAssign'> {
    case: Case;
    inboxPreAssignee: User | null;
    preferredUserForNextAssign?: User | null;
}

declare interface ContactInboxPreAssigneeChangedEvent extends Omit<ContactInboxPreAssigneeChangedEvent_2, 'data'> {
    data: ContactInboxPreAssigneeChangedData_2;
}

declare interface ContactInboxPreAssigneeChangedEvent_2 extends PushUpdateEventFields {
    data: ContactInboxPreAssigneeChangedData;
    eventObject: PushUpdateEventObject.CONSUMER_CONTACT;
    eventType: PushUpdateEventType.CONTACT_INBOX_PRE_ASSIGNEE_CHANGED;
}

declare type ContactNumber = Flavor<string, 'ContactNumber'>;

declare interface ContactPreferredUserChangedData {
    brand: Brand;
    case: Case_2;
    channel: Channel;
    preferredUserForNextAssign?: User_2 | null;
    previousPreferredUserForNextAssign?: User_2 | null;
    routingMode?: ContactRoutingMode;
    routingQueue: RoutingQueue | null;
}

/**
 * ContactPreferredUserChanged event with privacy filtering support.
 */
declare interface ContactPreferredUserChangedData_2 extends Omit<ContactPreferredUserChangedEvent_2['data'], 'case' | 'preferredUserForNextAssign' | 'previousPreferredUserForNextAssign'> {
    case: Case;
    preferredUserForNextAssign?: User | null;
    previousPreferredUserForNextAssign?: User | null;
}

declare interface ContactPreferredUserChangedEvent extends Omit<ContactPreferredUserChangedEvent_2, 'data'> {
    data: ContactPreferredUserChangedData_2;
}

declare interface ContactPreferredUserChangedEvent_2 extends PushUpdateEventFields {
    data: ContactPreferredUserChangedData;
    eventObject: PushUpdateEventObject.CONTACT;
    eventType: PushUpdateEventType.CONTACT_PREFERRED_USER_CHANGED;
}

export declare interface ContactRecipientsChangedChatEvent extends ChatEventData {
    data: ContactRecipientsChangedData;
    type: PushUpdateEventType_2.CONTACT_RECIPIENTS_CHANGED;
}

export declare interface ContactRecipientsChangedData extends Omit<ContactRecipientsChangedData_2, 'contact'> {
    contact: Contact;
}

declare interface ContactRecipientsChangedData_2 {
    brand: Brand;
    channel: Channel;
    contact: Case_2;
}

declare interface ContactRecipientsChangedEvent extends Omit<ContactRecipientsChangedEvent_2, 'data'> {
    data: ContactRecipientsChangedData;
}

declare interface ContactRecipientsChangedEvent_2 extends PushUpdateEventFields {
    eventObject: PushUpdateEventObject.CONTACT;
    eventType: PushUpdateEventType.CONTACT_RECIPIENTS_CHANGED;
    data: ContactRecipientsChangedData_2;
}

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

export declare type ContactStatusChangedData = CaseStatusChangedData_2;

declare type ContactStorageId = Flavor<string, 'ContactStorageId'>;

export declare interface ContactToRoutingQueueAssignmentChangedChatEvent extends ChatEventData {
    data: ContactToRoutingQueueAssignmentChangedData_2;
    type: typeof ChatEvent.CONTACT_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED;
}

declare interface ContactToRoutingQueueAssignmentChangedData {
    brand: Brand;
    case: Case_2;
    channel: Channel;
    preferredUserForNextAssign?: User_2 | null;
    previousRoutingQueue: RoutingQueue | null;
    routingMode?: ContactRoutingMode;
    routingQueue: RoutingQueue | null;
}

/**
 * ContactToRoutingQueueAssignmentChanged event with privacy filtering support.
 */
declare interface ContactToRoutingQueueAssignmentChangedData_2 extends Omit<ContactToRoutingQueueAssignmentChangedEvent_2['data'], 'case' | 'preferredUserForNextAssign'> {
    case: Case;
    preferredUserForNextAssign?: User | null;
}

declare interface ContactToRoutingQueueAssignmentChangedEvent extends Omit<ContactToRoutingQueueAssignmentChangedEvent_2, 'data'> {
    data: ContactToRoutingQueueAssignmentChangedData_2;
}

declare interface ContactToRoutingQueueAssignmentChangedEvent_2 extends PushUpdateEventFields {
    data: ContactToRoutingQueueAssignmentChangedData;
    eventObject: PushUpdateEventObject.CASE;
    eventType: PushUpdateEventType.CASE_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED;
}

declare enum ContentFormat {
    PLAIN = "plain",
    HTML = "html"
}

declare interface ContentRemoved {
    reason: string;
    removedAt: string;
}

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

export declare class CreateInvitationFailedError extends ChatSDKError {
    data: ChatEventData;
    constructor(message: string, data: ChatEventData);
}

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
    /**
     * Set Customer Identity ID on external Platform
     * @param customerIdentityIdOnExternalPlatform - Customer ID
     */
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
    setCustomField(name: CustomField['ident'], value: CustomField['value']): Promise<ChatEventData | undefined> | undefined;
    /**
     * Set Customer Custom fields
     * @param customFields - custom fields object
     * @example setCustomFields(\{ identName: 'value', identName2: 'value2' \})
     */
    setCustomFields(customFields: CustomFieldsObject): Promise<ChatEventData | undefined> | undefined;
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
    sendCustomFields(): Promise<ChatEventData | undefined>;
}

export declare interface CustomerIdentity {
    idOnExternalPlatform: CustomerIdentityIdOnExternalPlatform;
    firstName?: string;
    lastName?: string;
    image?: string;
}

declare interface CustomerIdentity_2 extends CustomerIdentity {
    customFields?: Array<CustomField>;
}

export declare type CustomerIdentityIdOnExternalPlatform = Flavor<string, 'CustomerIdentityIdOnExternalPlatform'>;

export declare interface CustomerReconnectSuccessPayloadData {
    reconnected: true;
}

declare interface CustomerStatistics {
    unseenMessagesCount: number;
}

export declare interface CustomerView {
    customFields: Array<CustomField>;
    firstName: string;
    fullName: string;
    lastName: string;
}

declare interface CustomField {
    ident: string;
    updatedAt?: string;
    value: string | null;
}

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

declare type CustomFieldsMap = Map<Ident, Value>;

export declare type CustomFieldsObject = Record<Ident, Value>;

declare enum CustomFieldType {
    TEXT = "text",
    EMAIL = "email",
    LIST = "list",
    TREE = "tree"
}

declare interface Destination {
    id: ChatWindowId;
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

declare interface EndUser {
    firstName: string;
    fullName?: string;
    id: EndUserIdentityId;
    surname: string;
}

declare interface EndUserIdentity {
    firstName: string;
    fullName?: string;
    id: EndUserIdentityId;
    idOnExternalPlatform: CustomerIdentityIdOnExternalPlatform;
    image: string;
    lastName: string;
    nickname?: string;
}

declare type EndUserIdentityId = Flavor<string, 'EndUserIdentityId'>;

export declare interface EnvironmentEndpoints {
    authorize: string;
    chat: string;
    gateway: string;
    name: string;
}

export declare enum EnvironmentName {
    AE1 = "AE1",
    AU1 = "AU1",
    AU2 = "AU2",
    CA1 = "CA1",
    EU1 = "EU1",
    EU2 = "EU2",
    JO1 = "JO1",
    JP1 = "JP1",
    KR1 = "KR1",
    NA1 = "NA1",
    NA2 = "NA2",
    UK1 = "UK1",
    UK2 = "UK2",
    ZA1 = "ZA1",
    custom = "custom"
}

declare type ErrorCallback_2 = (error: Error) => void;
export { ErrorCallback_2 as ErrorCallback }

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

/**
 * List of User fields that contain sensitive personal information.
 * These fields are completely removed when "Hide personal information" is enabled.
 */
declare const FIELDS_WITH_SENSITIVE_DATA: readonly ["emailAddress", "username", "loginUsername", "isBotUser", "isSurveyUser", "agentId", "incontactId", "inContactId", "divisionNumber", "publicImageUrl", "imagePublic", "image", "name", "fullName", "email", "inContactSharedUser", "isChatbot", "userType"];

declare interface FileRestrictionsSettings {
    allowedFileSize: string;
    allowedFileTypes: Array<{
        description: string;
        mimeType: string;
    }>;
    isAttachmentsEnabled: boolean;
}

declare interface FireProactiveActionEvent extends PushUpdateEventFields {
    data: FireProactiveData;
    eventObject: PushUpdateEventObject.CHAT_WINDOW;
    eventType: PushUpdateEventType.FIRE_PROACTIVE;
}

declare interface FireProactiveData {
    destination: Destination;
    proactiveAction: ProactiveAction;
}

declare type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;

declare interface Flavoring<FlavorT> {
    _type?: FlavorT;
}

declare interface ForwardedMessageReference {
    message: {
        id: MessageId;
    };
}

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

/**
 * Get channel availability
 * Returns the availability status of a channel, indicating whether it is online or offline.
 * @see {@link ChannelAvailabilityResponse}
 */
export declare function getChannelAvailability(brandId: BrandId, channelId: ChannelId, options: ChannelAvailabilityOptions): Promise<ChannelAvailabilityResponse>;

/**
 * Get channel info
 * Returns channel info like feature toggle status, translations, file upload restrictions, theme color settings etc.
 * @see {@link ChannelInfo}
 */
export declare function getChannelInfo(brandId: BrandId, channelId: ChannelId, language: string | undefined, options: ChannelInfoOptions): Promise<ChannelInfo>;

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

declare interface InboxAssigneeResponseTime {
    isRunning: boolean;
    slaEnabled: boolean;
    slaInSeconds: number | null;
    valueInSeconds: number;
}

export declare class IpAddressBlockedError extends Error {
    name: string;
}

export declare function isAgentTypingEndedEvent(event: ChatEventData): event is AgentTypingEndedEvent;

export declare function isAgentTypingStartedEvent(event: ChatEventData): event is AgentTypingStartedEvent;

export declare function isAssignedAgentChangedEvent(event: ChatEventData): event is AssignedAgentChangedEvent;

export declare const isAttachmentUpload: (files: FileList | Array<File> | Array<AttachmentUpload>) => files is AttachmentUpload[];

export declare const isAuthSuccessEvent: (payload: ChatEventData) => payload is AuthorizeConsumerEventSuccessResponse;

export declare function isChatSDKError(error: unknown): error is InstanceType<typeof ChatSDKError>;

export declare function isContactCreatedEvent(event: ChatEventData): event is ContactCreatedChatEvent;

export declare function isContactRecipientsChangedEvent(event: unknown): event is ContactRecipientsChangedChatEvent;

export declare function isContactStatusChangedEvent(event: ChatEventData): event is ContactStatusChangedChatEvent;

export declare function isContactToRoutingQueueAssignmentChangedEvent(event: ChatEventData): event is ContactToRoutingQueueAssignmentChangedChatEvent;

export declare function isCustomerReconnectSuccessPayloadData(payload: unknown): payload is CustomerReconnectSuccessPayloadData;

export declare function isJoinGroupChatFailedError(error: unknown): error is InstanceType<typeof JoinGroupChatFailedError>;

export declare const isLoadMetadataSuccessPayload: (response: ChatEventData) => response is LoadThreadMetadataChatEvent;

export declare function isMessage(item: unknown): item is Message;

export declare function isMessageCreatedEvent(event: unknown): event is MessageCreatedEvent;

export declare function isMessageReadChangedEvent(event: unknown): event is MessageReadChangedEvent;

export declare function isMessageSentEvent(event: unknown): event is MessageSentEvent;

export declare function isMoreMessagesLoadedEvent(event: ChatEventData): event is MoreMessagesLoadedEvent;

export declare const isRecoverSuccessEvent: (response: ChatEventData) => response is ThreadRecoveredChatEvent;

export declare const isSetPositionInQueueEvent: (event: unknown) => event is SetPositionInQueueChatEvent;

export declare const isStreamedMessageEventData: (eventData: unknown) => eventData is StreamedMessageEventData;

export declare function isThreadArchivedSuccessPayload(response: ChatEventData): response is ThreadArchivedEvent;

export declare const isThreadListFetchedPostbackData: (data: unknown) => data is ThreadListFetchedPostbackData;

export declare function isTokenRefreshedSuccessResponse(response: unknown): response is TokenRefreshedSuccessResponse;

export declare interface IStorage {
    getItem(key: string): string | null;
    removeItem(key: string): void;
    setItem(key: string, data: unknown): void;
}

export declare function isWindowClosing(): boolean;

declare interface JoinGroupChatEventData extends AwsInputEventData {
    invitation: {
        code: string;
    };
}

export declare class JoinGroupChatFailedError extends ChatSDKError {
    data: JoinGroupChatFailedErrorData;
    constructor(message: string, data: JoinGroupChatFailedErrorData);
}

declare interface JoinGroupChatFailedErrorData {
    response: ChatEventData;
}

declare interface LeaveGroupChatEventData extends AwsInputEventData {
    contact: {
        id: CaseId;
    };
}

export declare interface ListPickerMessageContent extends MessageContentBase {
    payload: ListPickerMessagePayload;
    type: MessageType.LIST_PICKER;
}

export declare interface ListPickerMessagePayload {
    actions: Array<ListPickerOption>;
    text: {
        content: string;
    };
    title: {
        content: string;
    };
}

declare interface ListPickerOption {
    description?: string;
    icon?: {
        fileName: string;
        mimeType: string;
        url: string;
    };
    postback?: string;
    text: string;
    type: string;
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

/**
 * Message type with privacy filtering support using union types.
 * The authorUser field can be either:
 * - User with all fields (when privacy is disabled)
 * - UserWithoutSensitiveData (when privacy is enabled - sensitive fields removed)
 * - null (when no author)
 *
 * This allows the type system to properly represent both privacy states.
 */
export declare interface Message extends Omit<Message_2, 'authorUser' | 'user'> {
    authorUser: User | null;
    user: User | null;
}

declare interface Message_2 {
    attachments: Array<Attachment>;
    authorEndUserIdentity: EndUserIdentity | null;
    authorNameRemoved: ContentRemoved;
    authorUser: User_2 | null;
    contactNumber: ContactNumber;
    contentRemoved: ContentRemoved;
    createdAt: string;
    createdAtWithMilliseconds: string;
    customerStatistics: {
        seenAt: string | null;
    };
    delivered: Array<MessageDelivered>;
    direction: MessageDirection;
    forward?: ForwardedMessageReference;
    hasAdditionalMessageContent?: boolean;
    id: MessageId;
    idOnExternalPlatform: MessageIdOnExternalPlatform;
    isHiddenOnExternalPlatform?: boolean;
    isMadeByUser: boolean;
    isRead?: boolean;
    isReplyAllowed?: boolean;
    isAiGenerated?: boolean;
    messageContent: MessageContent;
    postId: PostId;
    reactionStatistics?: ReactionStatistics;
    recipients: Array<Recipient>;
    replyChannel: Channel | null;
    replyToMessage?: {
        id: MessageId;
        idOnExternalPlatform?: MessageIdOnExternalPlatform;
    } | null;
    seen: Array<MessageSeen>;
    sentiment: Sentiment;
    tags: Array<Tag>;
    threadId: ThreadId;
    threadIdOnExternalPlatform: ThreadIdOnExternalPlatform;
    title?: string;
    url?: string | null;
    user?: User_2 | null;
    userStatistics: UserStatistics;
    readAt?: string | null;
    deletedOnExternalPlatform?: boolean;
}

declare interface MessageAddedIntoCaseData {
    brand: Brand;
    case: Case_2;
    channel: Channel;
    message: Message_2;
}

/**
 * MessageAddedIntoCase event with privacy filtering support.
 */
declare interface MessageAddedIntoCaseData_2 extends Omit<MessageAddedIntoCaseEvent_2['data'], 'message' | 'case'> {
    message: Message;
    case: Case;
}

declare interface MessageAddedIntoCaseEvent extends Omit<MessageAddedIntoCaseEvent_2, 'data'> {
    data: MessageAddedIntoCaseData_2;
}

declare interface MessageAddedIntoCaseEvent_2 extends PushUpdateEventFields {
    data: MessageAddedIntoCaseData;
    eventObject: PushUpdateEventObject.CASE;
    eventType: PushUpdateEventType.MESSAGE_ADDED_INTO_CASE;
}

export declare type MessageContent = MessageTextContent | QuickRepliesMessageContent | ListPickerMessageContent | RichLinkMessageContent | StreamedMessageContent;

export declare interface MessageContentBase {
    fallbackText?: string;
    isAutoTranslated?: boolean;
    parameters?: MessageParameters;
    postback?: string | null;
    type: MessageType;
}

/**
 * MessageCreated event with privacy filtering support.
 * When privacy is enabled, User fields in message and case are filtered.
 */
export declare interface MessageCreatedData extends Omit<MessageCreatedEvent_3['data'], 'message' | 'case'> {
    message: Message;
    case: Case;
}

declare interface MessageCreatedData_2 {
    agentContact?: AgentContact | null;
    brand: Brand;
    case: Case_2;
    channel: Channel;
    message: Message_2;
    thread: ThreadView;
}

export declare interface MessageCreatedEvent extends ChatEventData {
    data: MessageCreatedData;
    type: PushUpdateEventType_2.MESSAGE_CREATED;
}

declare interface MessageCreatedEvent_2 extends Omit<MessageCreatedEvent_3, 'data'> {
    data: MessageCreatedData;
}

declare interface MessageCreatedEvent_3 extends PushUpdateEventFields {
    data: MessageCreatedData_2;
    eventObject: PushUpdateEventObject.MESSAGE;
    eventType: PushUpdateEventType.MESSAGE_CREATED;
}

declare interface MessageDelivered {
    deliveredAt: string;
    endUserId: EndUserIdentityId;
    userId: UserId;
}

declare interface MessageDeliveryStatusChanged {
    agentContact?: AgentContact | null;
    brand: Brand;
    contact: Case_2;
    message: Message_2;
    pointOfContact: Channel;
}

declare interface MessageDeliveryStatusChangedData extends Omit<MessageDeliveryStatusChangedEvent_2['data'], 'message'> {
    message: Message;
}

declare interface MessageDeliveryStatusChangedEvent extends Omit<MessageDeliveryStatusChangedEvent_2, 'data'> {
    data: MessageDeliveryStatusChangedData;
}

declare interface MessageDeliveryStatusChangedEvent_2 extends PushUpdateEventFields {
    data: MessageDeliveryStatusChanged;
    eventObject: PushUpdateEventObject.MESSAGE;
    eventType: PushUpdateEventType.MESSAGE_DELIVERY_STATUS_CHANGED;
}

declare enum MessageDirection {
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

declare type MessageParameters = MessageParametersObject | unknown[];

declare interface MessageParametersObject {
    isInitialMessage?: boolean;
}

export declare interface MessagePayload {
    elements?: unknown[] | null;
    postback?: string | null;
    text?: string | null;
}

declare type MessagePayload_2 = {
    text?: string | null;
    postback?: Postback;
    elements?: Array<any> | null;
};

declare interface MessageReadChangedData {
    brand: Brand;
    contact: Contact_2;
    message: Message_2;
    agentContact?: AgentContact | null;
}

declare interface MessageReadChangedData_2 extends Omit<MessageReadChangedEvent_3['data'], 'contact' | 'message'> {
    contact: Contact;
    message: Message;
}

export declare interface MessageReadChangedEvent extends ChatEventData {
    data: MessageReadChangedData_2;
    type: PushUpdateEventType_2.MESSAGE_READ_CHANGED;
}

declare interface MessageReadChangedEvent_2 extends Omit<MessageReadChangedEvent_3, 'data'> {
    data: MessageReadChangedData_2;
}

declare interface MessageReadChangedEvent_3 extends PushUpdateEventFields {
    data: MessageReadChangedData;
    eventObject: PushUpdateEventObject.MESSAGE;
    eventType: PushUpdateEventType.MESSAGE_READ_CHANGED;
}

declare interface MessageSeen {
    endUserId: EndUserIdentityId;
    seenAt: string;
    userId: UserId;
}

declare interface MessageSeenChanged {
    agentContact?: AgentContact | null;
    brand: Brand;
    contact: Case_2;
    message: Message_2;
    pointOfContact: Channel;
}

declare interface MessageSeenChangedData extends Omit<MessageSeenChangedEvent_2['data'], 'message'> {
    message: Message;
}

declare interface MessageSeenChangedEvent extends Omit<MessageSeenChangedEvent_2, 'data'> {
    data: MessageSeenChangedData;
}

declare interface MessageSeenChangedEvent_2 extends PushUpdateEventFields {
    data: MessageSeenChanged;
    eventObject: PushUpdateEventObject.MESSAGE;
    eventType: PushUpdateEventType.MESSAGE_SEEN_CHANGED;
}

export declare interface MessageSentData extends Omit<MessageSentData_2, 'message'> {
    message: SentMessage;
}

declare interface MessageSentData_2 {
    brand: Brand;
    message: SentMessage_2;
    thread: ThreadView;
}

export declare interface MessageSentEvent extends ChatEventData {
    data: MessageSentData;
    type: PushUpdateEventType_2.MESSAGE_SENT;
}

declare interface MessageSentEvent_2 extends Omit<MessageSentEvent_3, 'data'> {
    data: MessageSentData;
}

declare interface MessageSentEvent_3 extends PushUpdateEventFields {
    data: MessageSentData_2;
    eventObject: PushUpdateEventObject.MESSAGE;
    eventType: PushUpdateEventType.MESSAGE_SENT;
}

export declare interface MessageSuccessEventData extends ChatEventData {
    id: string;
}

export declare interface MessageTextContent extends MessageContentBase {
    payload: MessagePayload;
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
    TIME_PICKER = "TIME_PICKER",
    STREAMED = "STREAMED"
}

declare interface MessageUpdatedData {
    agentContact?: AgentContact | null;
    brand: Brand;
    case: Case_2;
    channel: Channel;
    message: Message_2;
}

declare interface MessageUpdatedData_2 extends Omit<MessageUpdatedData, 'message'> {
    message: Message;
}

declare interface MessageUpdatedEvent extends Omit<MessageUpdatedEvent_2, 'data'> {
    data: MessageUpdatedData_2;
}

declare interface MessageUpdatedEvent_2 extends PushUpdateEventFields {
    data: MessageUpdatedData;
    eventObject: PushUpdateEventObject.MESSAGE;
    eventType: PushUpdateEventType.MESSAGE_UPDATED;
}

export declare interface MoreMessagesLoadedEvent extends ChatEventData {
    data: MoreMessagesLoadedPostbackData;
}

declare interface MoreMessagesLoadedPostbackData extends AwsResponseEventPostbackData {
    messages: Array<Message>;
    scrollToken: string;
    contactHistory: Array<PushUpdateEventFields>;
}

export declare interface NetworkRequestMetadata {
    httpHeaders?: Record<string, string>;
    websocketQuery?: Record<string, string>;
}

export declare interface OfflineMessageData {
    email: string;
    message: string;
    name: string;
}

declare interface PageView {
    endUserIdentityIdOnExternalPlatform: string;
    hasHappenedDuringSession: boolean;
    id: string;
    isOpeningVisit: boolean;
    pageTitle: string;
    pageUrl: string;
    visitedAt: string;
}

declare interface PageViewCreatedData {
    brand: Brand;
    channel: Channel;
    pageView: PageView;
    thread: ThreadView;
}

declare interface PageViewCreatedData_2 extends Omit<PageViewCreatedData, 'contact'> {
    contact: Contact;
}

declare interface PageViewCreatedEvent extends Omit<PageViewCreatedEvent_2, 'data'> {
    data: PageViewCreatedData_2;
}

declare interface PageViewCreatedEvent_2 extends PushUpdateEventFields {
    data: PageViewCreatedData;
    eventObject: PushUpdateEventObject.PAGE_VIEW;
    eventType: PushUpdateEventType.PAGE_VIEW_CREATED;
}

export declare type PersistentMenuItem = {
    id: string;
    label: string;
    postback: string;
};

declare type Postback = string | null;

/** @deprecated use ContactStorageId */
declare type PostId = ThreadId;

declare type PreContactFormCustomField = {
    isRequired: boolean;
    definition: CustomFieldDefinition;
};

declare interface ProactiveAction {
    action: ProactiveChatAction;
    conditions?: Array<{
        conditionType?: string;
        data?: Record<string, unknown>;
    }>;
}

declare interface ProactiveChatAction {
    actionId?: string;
    actionName: string;
    actionType: ActionType | ProactiveChatActionType;
    context?: {
        workflow?: {
            id?: string;
            name?: string;
        };
    };
    data?: ProactiveChatActionData;
}

declare interface ProactiveChatActionData {
    callToAction: {
        isVisible?: boolean;
        text: string | null;
    };
    content: {
        body: string | null;
        bodyText: string | null;
        headlineSecondaryText: string | null;
        headlineText: string | null;
        image: string | null;
    };
    customization: {
        customJs: string | null;
    };
    design: ProactiveChatActionDesign;
    handover: {
        customFields?: Array<CustomField>;
    };
    position: {
        general?: string;
        offsetX: number | null;
        offsetY: number | null;
    };
    template: {
        id: ProactiveChatTemplateId;
    };
}

declare interface ProactiveChatActionDesign {
    actionType: ActionType;
    background: {
        color: string | null;
        image: string | null;
    };
    border: {
        color: string | null;
        radius: number | null;
        size: number | null;
    };
    callToAction: {
        backgroundColor: string | null;
        textColor: string | null;
    };
    content: {
        bodyTextColor: string | null;
        headlineColor: string | null;
        headlineSecondaryColor: string | null;
    };
    dimension: {
        height: number | null;
        spaceBetweenText: number | null;
        width: number | null;
    };
}

declare enum ProactiveChatActionType {
    POPUPBOX = "PopupBox",
    CUSTOM_POPUPBOX = "CustomPopupBox",
    WELCOME_MESSAGE = "WelcomeMessage",
    PUSH_NOTIFICATION = "PushNotification",
    GUIDE_TEMPLATE = "GuideTemplate"
}

declare enum ProactiveChatTemplateId {
    FULL_IMAGE = "fullImage",
    IMAGE_LEFT = "imageLeft",
    IMAGE_RIGHT = "imageRight",
    IMAGE_TOP_CENTER = "imageTopCenter",
    DYNAMIC_IMAGE_BOTTOM = "dynamicImageBottom",
    CIRCLE_IMAGE_TOP = "circleImageTop"
}

declare type ProbableFetchCause = 'browser-blocked' | 'http-4xx' | 'http-5xx' | 'network-failure' | 'offline' | 'unknown' | 'user-aborted';

declare interface Proficiency {
    from: number;
    to: number;
}

declare interface PushNotificationSettings {
    title: string;
    body: string;
    isActive: boolean;
    pinpointProjectId?: string;
    deeplink?: string;
}

declare type PushUpdateContext = {
    initiator?: PushUpdateContextInitiator | null;
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

export declare type PushUpdateEvent = CaseCreatedEvent | CaseInboxAssigneeChangedEvent_2 | CaseStatusChangedEvent | CaseToRoutingQueueAssignmentChangedEvent | ContactInboxPreAssigneeChangedEvent | ContactPreferredUserChangedEvent | ContactRecipientsChangedEvent | ContactToRoutingQueueAssignmentChangedEvent | FireProactiveActionEvent | MessageAddedIntoCaseEvent | MessageCreatedEvent_2 | MessageDeliveryStatusChangedEvent | MessageSeenChangedEvent | MessageReadChangedEvent_2 | MessageSentEvent_2 | MessageUpdatedEvent | PageViewCreatedEvent | SenderTypingStartedEvent | SenderTypingEndedEvent | UserStatusChangedEvent | S3Event;

declare interface PushUpdateEventFields {
    context?: PushUpdateContext | [];
    createdAt: string;
    createdAtWithMilliseconds: string;
    eventId: PushUpdateEventId;
    eventObject: PushUpdateEventObject;
    eventType: PushUpdateEventType;
}

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

/**
 * Event types supported in ts-types-chat with privacy filtering.
 * This is a filtered subset of platform PushUpdateEventType.
 *
 * IMPORTANT: When adding a new event type to PushUpdateEvent union,
 * you MUST also add the corresponding event type here.
 */
declare enum PushUpdateEventType_2 {
    /** @deprecated use CONTACT_CREATED */
    CASE_CREATED = "CaseCreated",
    CONTACT_CREATED = "CaseCreated",
    /** @deprecated use ASSIGNED_AGENT_CHANGED */
    CASE_INBOX_ASSIGNEE_CHANGED = "CaseInboxAssigneeChanged",
    ASSIGNED_AGENT_CHANGED = "CaseInboxAssigneeChanged",
    /** @deprecated use CONTACT_STATUS_CHANGED */
    CASE_STATUS_CHANGED = "CaseStatusChanged",
    CONTACT_STATUS_CHANGED = "CaseStatusChanged",
    /** @deprecated use CONTACT_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED */
    CASE_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED = "CaseToRoutingQueueAssignmentChanged",
    CONTACT_TO_ROUTING_QUEUE_ASSIGNMENT_CHANGED = "CaseToRoutingQueueAssignmentChanged",
    CONTACT_INBOX_PRE_ASSIGNEE_CHANGED = "ConsumerContactInboxPreAssigneeChanged",
    CONTACT_PREFERRED_USER_CHANGED = "ContactPreferredUserChanged",
    CONTACT_RECIPIENTS_CHANGED = "ContactRecipientsChanged",
    MESSAGE_ADDED_INTO_CASE = "MessageAddedIntoCase",
    MESSAGE_CREATED = "MessageCreated",
    MESSAGE_DELIVERY_STATUS_CHANGED = "MessageDeliveryStatusChanged",
    MESSAGE_SEEN_CHANGED = "MessageSeenChanged",
    MESSAGE_READ_CHANGED = "MessageReadChanged",
    MESSAGE_SENT = "MessageSent",
    MESSAGE_UPDATED = "MessageUpdated",
    PAGE_VIEW_CREATED = "PageViewCreated",
    SENDER_TYPING_STARTED = "SenderTypingStarted",
    SENDER_TYPING_ENDED = "SenderTypingEnded",
    USER_STATUS_CHANGED = "UserStatusChanged",
    FIRE_PROACTIVE = "FireProactiveAction",
    EVENT_IN_S3 = "EventInS3"
}

export declare interface QuickRepliesMessageContent extends MessageContentBase {
    payload: QuickRepliesMessagePayload;
    type: MessageType.QUICK_REPLIES;
}

export declare interface QuickRepliesMessagePayload {
    text: {
        content: string;
    };
    actions: Array<{
        type: string;
        text: string;
        postback: string;
    }>;
}

export declare type RawEventCallback = (event: ChatCustomEvent) => void;

declare interface ReactionStatistics {
    isLikedByChannel: boolean;
    isSharedByChannel: boolean;
    likes: number;
    shares: number;
}

declare interface Recipient {
    anonymizedAt: string | null;
    anonymizedReason: string | null;
    idOnExternalPlatform: IdentityIdOnExternalPlatform;
    isPrimary: boolean;
    isPrivate: boolean;
    name: string;
}

/** @deprecated use CustomerRecipient */
declare interface RecipientCustomer {
    customFields: Array<CustomField>;
    firstName: string;
    fullName: string;
    id: EndUserIdentityId;
    image: string;
    surname: string | null;
}

declare interface ReconnectConsumerData extends AwsInputEventData {
    accessToken: {
        token: string;
    } | null;
}

export declare const registerWindowUnload: () => void;

export declare type RemoveListenerFunction = () => void;

export declare interface RichLinkMessageContent extends MessageContentBase {
    payload: RichLinkMessagePayload;
    type: MessageType.RICH_LINK;
}

export declare interface RichLinkMessagePayload {
    media: {
        fileName: string;
        mimeType: string;
        url: string;
    };
    title: {
        content: string;
    };
    url: string;
}

declare interface RoutingQueue {
    acceptRejectFlowRefusalTimeoutInSeconds?: number | null;
    accelerationTimestampCanBeReset?: boolean;
    id: RoutingQueueId;
    isAcceptRejectFlowEnabled?: boolean | null;
    isDeleted?: boolean;
    isSubqueue: boolean;
    name: string;
    skillId?: number | null;
}

declare type RoutingQueueId = Flavor<string, 'RoutingQueueId'>;

declare interface S3Event extends PushUpdateEventFields {
    data: S3EventData;
    eventObject: PushUpdateEventObject.S3_OBJECT;
    eventType: PushUpdateEventType.EVENT_IN_S3;
}

declare interface S3EventData {
    originEvent: {
        eventObject: string;
        eventType: string;
    };
    s3Object: {
        url: string;
    };
}

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

export declare class SendEmailInvitationFailedError extends ChatSDKError {
    data: SendEmailInvitationFailedErrorData;
    constructor(message: string, data: SendEmailInvitationFailedErrorData);
}

declare interface SendEmailInvitationFailedErrorData {
    response: unknown;
}

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

/**
 * SenderTypingEnded event with privacy filtering support.
 */
declare interface SenderTypingEndedData extends Omit<SenderTypingEndedEvent_2['data'], 'user'> {
    user?: User;
}

declare interface SenderTypingEndedEvent extends Omit<SenderTypingEndedEvent_2, 'data'> {
    data: SenderTypingEndedData;
}

declare interface SenderTypingEndedEvent_2 extends PushUpdateEventFields {
    data: TypingEventData;
    eventObject: PushUpdateEventObject.SENDER_ACTION;
    eventType: PushUpdateEventType.SENDER_TYPING_ENDED;
}

/**
 * SenderTypingStarted event with privacy filtering support.
 */
declare interface SenderTypingStartedData extends Omit<SenderTypingStartedEvent_2['data'], 'user'> {
    user?: User;
}

declare interface SenderTypingStartedEvent extends Omit<SenderTypingStartedEvent_2, 'data'> {
    data: SenderTypingStartedData;
}

declare interface SenderTypingStartedEvent_2 extends PushUpdateEventFields {
    data: TypingEventData;
    eventObject: PushUpdateEventObject.SENDER_ACTION;
    eventType: PushUpdateEventType.SENDER_TYPING_STARTED;
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
        payload: MessagePayload_2;
        postback?: Postback;
    };
    attachments: Array<AttachmentUpload>;
    browserFingerprint: BrowserFingerprint;
}

export declare class SendMessageFailedError extends ChatSDKError {
    data: SendMessageFailedErrorData | undefined;
    constructor(message: string, data?: SendMessageFailedErrorData);
}

declare interface SendMessageFailedErrorData {
    response: unknown;
}

declare interface SendMessageOptions {
    browserFingerprint?: BrowserFingerprint;
    messageId?: MessageId;
}

export declare interface SendOutboundEventData extends Omit<SendMessageEventData, 'consumer'> {
}

declare type SensitiveUserField = (typeof FIELDS_WITH_SENSITIVE_DATA)[number];

declare enum Sentiment {
    POSITIVE = "positive",
    NEUTRAL = "neutral",
    NEGATIVE = "negative"
}

export declare interface SentMessage extends Omit<SentMessage_2, 'authorUser'> {
    authorUser: User | null;
}

declare interface SentMessage_2 {
    attachments: Array<Attachment>;
    authorEndUserIdentity: EndUserIdentity | null;
    authorUser: User_2 | null;
    createdAt: string;
    direction: MessageDirection;
    idOnExternalPlatform: MessageIdOnExternalPlatform;
    messageContent: MessageContent;
    threadIdOnExternalPlatform: ThreadIdOnExternalPlatform;
}

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
        id?: RoutingQueueId;
    };
    isAnyAgentOnlineForQueue: boolean;
}

export declare function splitName(name: string): [string, string];

declare interface Statistics {
    inboxAssigneeResponseTime: InboxAssigneeResponseTime | null;
}

export declare interface StreamedMessageContent extends MessageContentBase {
    payload: StreamedPayload;
    type: MessageType.STREAMED;
}

export declare interface StreamedMessageDelta {
    content: string;
}

export declare interface StreamedMessageEventData {
    delta?: StreamedMessageDelta;
    fullContent: string;
    messageId: string;
    originalMessage: Message;
    threadId: string;
}

export declare interface StreamedPayload {
    protocol: string;
    sourceUrl: string;
}

declare interface Tag {
    color: string;
    id: TagId;
    isActive: boolean;
    title: string;
}

declare type TagId = Flavor<number, 'TagId'>;

declare type TenantId = Flavor<string, 'TenantId'>;

declare interface ThirdPartyToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
}

export declare class Thread {
    idOnExternalPlatform: ThreadIdOnExternalPlatform;
    protected _websocketClient: WebSocketClient;
    protected _existsOnPlatform: boolean;
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
    protected _setExistsOnPlatform(value: boolean): void;
    protected _setExistsOnPlatformBasedOnContactStatus(event: ChatCustomEvent): void;
    protected _setCustomerExists(): void;
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
    ownerAssignee: User | null;
    inboxAssignee: User | null;
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
    data: ThreadRecoverFailedErrorData;
    constructor(message: string, data: ThreadRecoverFailedErrorData);
}

declare interface ThreadRecoverFailedErrorData {
    response: ChatEventData;
}

export declare interface ThreadView {
    canAddMoreMessages: boolean;
    channelId?: ChannelId;
    id: ThreadId;
    idOnExternalPlatform: ThreadIdOnExternalPlatform;
    threadName: string;
}

declare interface TokenRefreshedPostbackData extends AwsResponseEventPostbackData {
    accessToken: AccessToken;
}

declare interface TokenRefreshedSuccessResponse {
    data: TokenRefreshedPostbackData;
    type: AwsResponseEventType.TOKEN_REFRESHED;
}

declare type TransactionAccessToken = string;

export declare interface TransactionToken {
    accessToken: TransactionAccessToken;
    expiresIn: number;
}

export declare interface TransactionTokenResponse extends TransactionToken {
    contact?: {
        customFields?: Array<CustomField>;
    };
    customerIdentity: CustomerIdentity_2;
    identityToken?: string;
    thirdParty?: ThirdPartyToken;
}

declare interface TypingEventData {
    brand: Brand;
    channel: Channel;
    thread: ThreadView;
    user?: User_2;
    direction?: 'inbound' | 'outbound';
}

export declare class UploadAttachmentError extends ChatSDKError {
    data: UploadAttachmentErrorData;
    constructor(message: string, data: UploadAttachmentErrorData);
}

declare interface UploadAttachmentErrorData {
    response: UploadFailResponse;
}

export declare interface UploadFailResponse {
    allowedFileSize: string;
    allowedFileTypes: Array<{
        description: string;
        mimeType: string;
    }>;
}

/**
 * User type that supports both privacy modes:
 * - UserFromPlatformTypes: Full user data with all fields (privacy disabled)
 * - UserWithoutSensitiveData: User data without sensitive fields (privacy enabled)
 *
 * When "Hide personal information" is enabled, sensitive fields are completely removed.
 */
export declare type User = User_2 | UserWithoutSensitiveData;

declare interface User_2 {
    agentId?: number | null;
    emailAddress: string;
    firstName: string;
    id: UserId;
    imageUrl?: string;
    incontactId: string | null;
    isBotUser: boolean;
    isSurveyUser: boolean;
    loginUsername: string;
    nickname?: string | null;
    publicImageUrl?: string;
    surname: string;
    divisionNumber: number | null;
    imagePublic?: string | null;
    image?: string | null;
}

export declare type UserId = Flavor<number, 'UserId'>;

declare interface UserStatistics {
    createdToReadSeconds: {
        notReflectingBusinessHours: number | null;
        reflectingBusinessHours: number | null;
    } | null;
    readAt: string | null;
    seenAt: string | null;
}

declare interface UserStatus {
    id: UserStatusId;
    name: string;
    timeElapsedInSeconds?: number;
    type: UserStatusType;
}

declare interface UserStatusChangedData {
    brand: Brand;
    user: User_2;
    userStatus: UserStatus;
}

declare interface UserStatusChangedData_2 extends Omit<UserStatusChangedData, 'user'> {
    user: User;
}

declare interface UserStatusChangedEvent extends Omit<UserStatusChangedEvent_2, 'data'> {
    data: UserStatusChangedData_2;
}

declare interface UserStatusChangedEvent_2 extends PushUpdateEventFields {
    data: UserStatusChangedData;
    eventObject: PushUpdateEventObject.USER_STATUS;
    eventType: PushUpdateEventType.USER_STATUS_CHANGED;
}

declare type UserStatusId = Flavor<string, 'UserStatusId'>;

declare enum UserStatusType {
    ONLINE = "online",
    OFFLINE = "offline",
    NOT_AVAILABLE = "na"
}

/**
 * User type without sensitive personal information fields.
 * Used when "Hide personal information" channel setting is enabled.
 *
 * Removed fields: emailAddress, loginUsername, isBotUser, isSurveyUser, agentId, incontactId, divisionNumber
 * Kept fields with actual values: id, firstName, surname, nickname, imageUrl, publicImageUrl
 */
declare type UserWithoutSensitiveData = Omit<User_2, SensitiveUserField>;

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
    AUTHORIZATION_FAILED = "authorizationFailed",
    RECONNECTING = "reconnecting"
}

export declare class WebSocketConnectionError extends Error {
    name: string;
    constructor(message: string, reason?: string);
}

export { }
