import { NodeEnvEnum } from './node-env.enum';
import { IServerConfig } from '@infrastructure/config/server-config.interface';
import { IJwtConfig } from '@infrastructure/config/jwt.interface';
import { AppConfigEnum } from '@infrastructure/config/app-config.enum';
import { IPostgresqlConfig } from '@infrastructure/config/postgresql-cofnig.interface';
import { IRabbitMQConfig } from '@infrastructure/config/rabbitmq-config.interface';
import { IMongoConfig } from './mongo-config.interface';
import { IRedisConfig } from './redis-config';

export interface IAppConfig {
  [AppConfigEnum.NODE_ENV]: NodeEnvEnum;
  [AppConfigEnum.SERVER_CONFIG]: IServerConfig;
  [AppConfigEnum.POSTGRESQL_CONFIG]: IPostgresqlConfig;
  [AppConfigEnum.JWT_CONFIG]: IJwtConfig;
  [AppConfigEnum.RABBITMQ_CONFIG]: IRabbitMQConfig;
  [AppConfigEnum.MONGO_CONFIG]: IMongoConfig;
  [AppConfigEnum.REDIS_CONFIG]: IRedisConfig;
}
