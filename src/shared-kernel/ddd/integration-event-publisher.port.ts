import { IntegrationEvent } from '@shared-kernel/ddd/integration-event';

export const INTEGRATION_EVENT_PUBLISHER_TOKEN =
  'INTEGRATION_EVENT_PUBLISHER_TOKEN';

export interface IntegrationEventPublisherPort {
  publish(event: IntegrationEvent): Promise<void>;
}
