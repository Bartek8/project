import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { DomainEvent } from '@shared-kernel/ddd/domain-event';
import { PublisherPort } from '@shared-kernel/ddd/publisher.port';

@Injectable()
export class CqrsPublisherAdapter implements PublisherPort {
  constructor(private readonly eventBus: EventBus) {}

  public async publish(event: DomainEvent): Promise<void> {
    await this.eventBus.publish(event);
  }
}
