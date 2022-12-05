import { ChatEventData, ChatEventType } from './ChatEvent';
export interface IChatEventTarget extends EventTarget {
    addEventListener<K extends ChatEventType>(type: K, listener: (event: CustomEvent<ChatEventData>) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
    dispatchEvent(event: CustomEvent<ChatEventData>): boolean;
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener<K extends ChatEventType>(type: K, callback: (event: CustomEvent<ChatEventData>) => void, options?: boolean | EventListenerOptions | undefined): void;
}
export declare const ChatEventTarget: {
    new (): IChatEventTarget;
    prototype: IChatEventTarget;
};
