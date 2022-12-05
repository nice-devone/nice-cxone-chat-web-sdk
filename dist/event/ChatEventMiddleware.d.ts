import { ChatEventData } from './ChatEvent';
export declare type EventMiddleware = (eventData: ChatEventData) => ChatEventData | null;
export declare class ChatEventMiddleware {
    middlewares: Array<EventMiddleware>;
    register(middleware: EventMiddleware): void;
    process(event?: ChatEventData): ChatEventData | null;
}
