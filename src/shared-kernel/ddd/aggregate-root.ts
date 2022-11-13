import { Guid } from '../type/guid.value-object';
import { DomainEvent } from './domain-event';
import { PublisherPort } from '@shared-kernel/ddd/publisher.port';

export abstract class AggregateRoot {
  protected domainEvents: DomainEvent[] = [];

  protected id: Guid;

  constructor(id?: Guid) {
    this.id = id || Guid.new();
  }

  public getId(): Guid {
    return this.id;
  }

  protected add(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  public async commit(eventPublisher: PublisherPort): Promise<void> {
    await this.domainEvents.forEach((domainEvent) =>
      eventPublisher.publish(domainEvent),
    );
    this.domainEvents = [];
  }
}
