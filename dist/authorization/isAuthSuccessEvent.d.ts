import { ChatEventData } from '../event/ChatEvent';
import { AuthorizeConsumerEventSuccessResponse } from './AuthorizeConsumerEventResponse';
export declare const isAuthSuccessEvent: (payload: ChatEventData) => payload is AuthorizeConsumerEventSuccessResponse;
