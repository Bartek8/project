import { Injectable } from '@nestjs/common';
import { IntegrationEvent } from '@shared-kernel/ddd/integration-event';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IntegrationEventPublisherPort } from '@shared-kernel/ddd/integration-event-publisher.port';

@Injectable()
export class RabbitmqPublisherAdapter implements IntegrationEventPublisherPort {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  async publish(event: IntegrationEvent): Promise<void> {
    const eventName = event.constructor.name;
    await this.amqpConnection.publish(eventName, '', event);
  }
}
