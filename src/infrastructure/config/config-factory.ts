import { AppConfigEnum } from './app-config.enum';
import { IAppConfig } from './app-config.interface';
import { NodeEnvEnum } from './node-env.enum';

const ENV = process.env;

export const getNodeEnv = (): NodeEnvEnum =>
  NodeEnvEnum[ENV[AppConfigEnum.NODE_ENV]] || NodeEnvEnum.PRODUCTION;

export const nodeEnvIn = (...env: NodeEnvEnum[]): boolean =>
  env.includes(getNodeEnv());

export const getEnvFileName = (): string => {
  const env = getNodeEnv();
  switch (env) {
    case NodeEnvEnum.PRODUCTION:
      return '.env.prod';
    default:
      return '.env.local';
  }
};

export const infrastructureRequired = (): boolean =>
  nodeEnvIn(
    NodeEnvEnum.PRODUCTION,
    NodeEnvEnum.DEVELOPMENT,
    NodeEnvEnum.E2E_TEST,
  );

export default (): IAppConfig => {
  return {
    [AppConfigEnum.NODE_ENV]: getNodeEnv(),
    [AppConfigEnum.SERVER_CONFIG]: {
      port: +ENV.APP_PORT,
      hostname: ENV.APP_HOSTNAME,
      protocol: ENV.APP_PROTOCOL,
    },
    [AppConfigEnum.MONGO_CONFIG]: {
      database: ENV.MONGO_DATABASE,
      hostname: ENV.MONGO_HOSTNAME,
      username: ENV.MONGO_USERNAME,
      password: ENV.MONGO_PASSWORD,
    },
    [AppConfigEnum.POSTGRESQL_CONFIG]: {
      hostname: ENV.POSTGRESQL_HOST,
      username: ENV.POSTGRESQL_USERNAME,
      password: ENV.POSTGRESQL_PASSWORD,
      database: ENV.POSTGRESQL_DATABASE,
      port: +ENV.POSTGRESQL_PORT,
    },
    [AppConfigEnum.REDIS_CONFIG]: {
      host: ENV.REDIS_HOST,
      port: +ENV.REDIS_PORT,
      password: ENV.REDIS_PASSWORD,
      username: ENV.REDIS_USERNAME,
    },
    [AppConfigEnum.JWT_CONFIG]: {
      accessTokenSecret: ENV.ACCESS_TOKEN_SECRET,
      accessTokenExpirationTime: +ENV.ACCESS_TOKEN_EXPIRATION_TIME,
      refreshTokenSecret: ENV.REFRESH_TOKEN_SECRET,
      refreshTokenExpirationTime: +ENV.REFRESH_TOKEN_EXPIRATION_TIME,
    },
    [AppConfigEnum.RABBITMQ_CONFIG]: {
      port: +ENV.RABBITMQ_PORT,
      hostname: ENV.RABBITMQ_HOST,
      username: ENV.RABBITMQ_USERNAME,
      password: ENV.RABBITMQ_PASSWORD,
    },
  };
};
