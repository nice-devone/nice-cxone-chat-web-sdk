import { ChatEventData } from '../event/ChatEvent';
export declare const parseWsMessageEvent: (event: CustomEvent) => ChatEventData | undefined;
export declare const onMessageHandler: (event: ChatEventData) => void;
