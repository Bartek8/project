import { Global, Module } from '@nestjs/common';
import { configProvider } from './config/config.provider';
import { CqrsModule } from '@nestjs/cqrs';
import { typeormModuleConfig } from '@infrastructure/config/typeorm-module.config';
import { adapters } from '@infrastructure/adapter';
import { rabbitMQModuleConfig } from '@infrastructure/config/rabbitmq-module.config';

const imports = [
  typeormModuleConfig(),
  rabbitMQModuleConfig(),
  configProvider(),
];

@Global()
@Module({
  imports: [CqrsModule, ...imports],
  providers: [...adapters],
  exports: [...adapters],
})
export class InfrastructureModule {}
