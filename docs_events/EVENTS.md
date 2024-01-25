# Events

This document describes the events that the client can listen to.

## Message events

| Event                     | Description                                                                                                                                                           |                                                |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| MessageAddedIntoCase      | Indicates a message was added into a contact.                                                                                                                         | [Detail](Message/MessageAddedIntoCase.md)      |
| MessageCreated            | Signifies the creation of a message.                                                                                                                                  | [Detail](Message/MessageCreated.md)            |
| MessageDeliveredToEndUser | Shows that the message was delivered to the customer.                                                                                                                 | [Detail](Message/MessageDeliveredToEndUser.md) |
| MessageDeliveredToUser    | Indicates the message was delivered to an agent.                                                                                                                      | [Detail](Message/MessageDeliveredToUser.md)    |
| MessageReadChanged        | Indicates a change in the read status of a message.                                                                                                                   | [Detail](Message/MessageReadChanged.md)        |
| MessageSeenByEndUser      | Shows that the message was seen by the customer.                                                                                                                      | [Detail](Message/MessageSeenByEndUser.md)      |
| MessageSeenByUser         | Indicates the message was seen by an agent.                                                                                                                           | [Detail](Message/MessageSeenByUser.md)         |
| MessageSent               | Signifies that a message was sent from agent to customer. <br/><br/>It should be received before MessageCreated event so that the client can show the message faster. | [Detail](Message/MessageSent.md)               |

## Contact events

| Event                                  | Description                                                    |                                                             |
|----------------------------------------|----------------------------------------------------------------|-------------------------------------------------------------|
| ContactCreated                         | Signifies the creation of a contact.                           | [Detail](Contact/ContactCreated.md)                         |
| CaseInboxAssigneeChanged               | Shows a change in the assigned agent for a contact.            | [Detail](Contact/CaseInboxAssigneeChanged.md)               |
| ContactStatusChanged                   | Indicates a status change in a contact.                        | [Detail](Contact/ContactStatusChanged.md)                   |
| ContactToRoutingQueueAssignmentChanged | Indicates a change in the contact to routing queue assignment. | [Detail](Contact/ContactToRoutingQueueAssignmentChanged.md) |
| ContactRecipientsChanged               | Shows a change in the participants of a group chat.            | [Detail](Contact/ContactRecipientsChanged.md)               |

## Other events

| Event               | Description                                                    | Detail                           |
|---------------------|----------------------------------------------------------------|----------------------------------|
| PageViewCreated     | Indicates the customer viewed a page.                          | [Detail](PageViewCreated.md)     |
| AgentTypingStarted  | Signifies the start of agent's typing.                         | [Detail](AgentTypingStarted.md)  |
| AgentTypingEnded    | Signifies the end of agent's typing.                           | [Detail](AgentTypingEnded.md)    |
| FireProactiveAction | Triggers a proactive action in the client (for example popup). | [Detail](FireProactiveAction.md) |
