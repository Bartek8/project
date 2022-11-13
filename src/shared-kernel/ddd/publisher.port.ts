import { DomainEvent } from './domain-event';

export const PUBLISHER_PORT_TOKEN = 'PUBLISHER_PORT_TOKEN';

export interface PublisherPort {
  publish(event: DomainEvent): Promise<void>;
}
