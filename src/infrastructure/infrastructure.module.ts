import { Global, Module } from '@nestjs/common';
import { configProvider } from './config/config.provider';
import { CqrsModule } from '@nestjs/cqrs';
import { typeormModuleConfig } from '@infrastructure/config/typeorm-module.config';
import { adapters } from '@infrastructure/adapter';
import { rabbitMQModuleConfig } from '@infrastructure/config/rabbitmq-module.config';
import { mongooseModuleConfig } from './config/mongoose-module.config';
import { infrastructureIndicators } from './indicator';

const imports = [
  typeormModuleConfig(),
  rabbitMQModuleConfig(),
  mongooseModuleConfig(),
  configProvider(),
];

@Global()
@Module({
  imports: [CqrsModule, ...imports],
  providers: [...adapters, ...infrastructureIndicators],
  exports: [...adapters, ...infrastructureIndicators],
})
export class InfrastructureModule {}
