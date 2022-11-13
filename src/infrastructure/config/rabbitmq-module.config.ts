import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common';
import { IRabbitMQConfig } from './rabbitmq-config.interface';
import { IAppConfig } from '@infrastructure/config/app-config.interface';
import { AppConfigEnum } from '@infrastructure/config/app-config.enum';

export const rabbitMQConnectionString = (
  rabbitMQConfig: IRabbitMQConfig,
): string => {
  return `amqp://${rabbitMQConfig.username}:${rabbitMQConfig.password}@${rabbitMQConfig.hostname}:${rabbitMQConfig.port}`;
};

enum ExchangeType {
  FANOUT = 'fanout',
}

const DEFAULT_CONNECTION_TIMEOUT = 20000;

export const rabbitMQModuleConfig = (): DynamicModule => {
  return RabbitMQModule.forRootAsync(RabbitMQModule, {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => {
      return {
        uri: rabbitMQConnectionString(
          configService.get<IAppConfig[AppConfigEnum.RABBITMQ_CONFIG]>(
            AppConfigEnum.RABBITMQ_CONFIG,
          ),
        ),
        prefetchCount: 1,
        connectionInitOptions: {
          wait: true,
          timeout: DEFAULT_CONNECTION_TIMEOUT,
        },
        exchanges: [
          {
            name: 'Failed',
            type: ExchangeType.FANOUT,
          },
        ],
      };
    },
    inject: [ConfigService],
  });
};
