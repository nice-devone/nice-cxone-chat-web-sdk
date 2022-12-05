import { ChatEventData } from '../event/ChatEvent';
export declare const requestQueue: Map<string, (value: ChatEventData) => void>;
