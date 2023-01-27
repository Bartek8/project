import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common';
import { IAppConfig } from './app-config.interface';
import { AppConfigEnum } from './app-config.enum';
import typeormConfig from './typeorm.config';

export const typeormModuleConfig = (): DynamicModule => {
  return TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) => {
      const postgresqlConfig = configService.get<
        IAppConfig[AppConfigEnum.POSTGRESQL_CONFIG]
      >(AppConfigEnum.POSTGRESQL_CONFIG);
      return {
        ...typeormConfig,
        host: postgresqlConfig.hostname,
        username: postgresqlConfig.username,
        password: postgresqlConfig.password,
        port: postgresqlConfig.port,
        database: postgresqlConfig.database,
      };
    },
    inject: [ConfigService],
  });
};
