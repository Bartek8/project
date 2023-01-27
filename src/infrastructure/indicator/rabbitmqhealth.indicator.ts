import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@Injectable()
export class RabbitMQHealthIndicator extends HealthIndicator {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      this.amqpConnection.managedConnection.isConnected();
      return this.getStatus(key, true);
    } catch (error) {
      throw new HealthCheckError(
        'RabbitMQ connection failed',
        this.getStatus(key, false),
      );
    }
  }
}
