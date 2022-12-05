import { ThreadIdOnExternalPlatform } from '@brandembassy/ts-types-platform/dist/thread/ThreadIdOnExternalPlatform';
import { ChatEventData } from '../event/ChatEvent';
import { EventListenerFunction } from '../event/ListenerFunction';
export declare const filterCurrentThreadEventHandler: (threadId: ThreadIdOnExternalPlatform, handler: EventListenerFunction) => (event: CustomEvent<ChatEventData>) => void;
