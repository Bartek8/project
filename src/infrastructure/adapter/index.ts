import { Provider } from '@nestjs/common';
import { NodeEnvEnum } from '../config/node-env.enum';
import { CqrsPublisherAdapter } from './cqrs-publisher.adapter';
import { RabbitmqPublisherAdapter } from './rabbitmq-publisher.adapter';
import {
  getNodeEnv,
  infrastructureRequired,
} from '@infrastructure/config/config-factory';
import { PUBLISHER_PORT_TOKEN } from '@shared-kernel/ddd/publisher.port';
import {
  IntegrationEventPublisherPort,
  INTEGRATION_EVENT_PUBLISHER_TOKEN,
} from '@shared-kernel/ddd/integration-event-publisher.port';

const resolvePublisherPortAdapter = (): Provider => {
  switch (getNodeEnv()) {
    case NodeEnvEnum.INTEGRATION_TEST:
    case NodeEnvEnum.UNIT_TEST: {
      return {
        provide: PUBLISHER_PORT_TOKEN,
        useValue: {
          publish(): Promise<void> {
            return null;
          },
        },
      };
    }
    case NodeEnvEnum.DEVELOPMENT:
    case NodeEnvEnum.PRODUCTION:
    case NodeEnvEnum.E2E_TEST:
    default: {
      return {
        provide: PUBLISHER_PORT_TOKEN,
        useClass: CqrsPublisherAdapter,
      };
    }
  }
};

const resolveIntegrationPublisherPortAdapter =
  (): Provider<IntegrationEventPublisherPort> => {
    return infrastructureRequired()
      ? {
          provide: INTEGRATION_EVENT_PUBLISHER_TOKEN,
          useClass: RabbitmqPublisherAdapter,
        }
      : {
          provide: INTEGRATION_EVENT_PUBLISHER_TOKEN,
          useValue: {
            publish(): Promise<void> {
              return;
            },
          },
        };
  };

export const adapters: Provider[] = [
  resolvePublisherPortAdapter(),
  resolveIntegrationPublisherPortAdapter(),
];
