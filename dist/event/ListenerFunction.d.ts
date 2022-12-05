import { ChatEventData } from './ChatEvent';
export declare type RemoveListenerFunction = () => void;
export declare type EventListenerFunction = (event: CustomEvent<ChatEventData>) => void;
