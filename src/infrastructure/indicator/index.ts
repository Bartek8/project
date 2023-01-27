import { Provider } from '@nestjs/common';
import { RabbitMQHealthIndicator } from './rabbitmqhealth.indicator';

export const infrastructureIndicators: Provider[] = [RabbitMQHealthIndicator];
