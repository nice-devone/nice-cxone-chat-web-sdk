import { Message } from '../message/Message';
export interface ScrollData {
    messages: Array<Message>;
    scrollToken: string;
}
export declare function storeThreadScrollData(scrollData: ScrollData): void;
