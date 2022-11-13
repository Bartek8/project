import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredDomainEvent } from '../../user-domain/domain-event/user-registered.domain-event';
import { Inject } from '@nestjs/common';
import { UserRegisteredIntegrationEvent } from '../../user-contract/integration-event/user-registered.integration-event';
import {
  IntegrationEventPublisherPort,
  INTEGRATION_EVENT_PUBLISHER_TOKEN,
} from '@shared-kernel/ddd/integration-event-publisher.port';

@EventsHandler(UserRegisteredDomainEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserRegisteredDomainEvent>
{
  constructor(
    @Inject(INTEGRATION_EVENT_PUBLISHER_TOKEN)
    private readonly integrationEventPublisher: IntegrationEventPublisherPort,
  ) {}

  async handle(event: UserRegisteredDomainEvent): Promise<void> {
    await this.integrationEventPublisher.publish(
      new UserRegisteredIntegrationEvent({
        userId: event.id,
        userRole: event.role,
      }),
    );
  }
}
