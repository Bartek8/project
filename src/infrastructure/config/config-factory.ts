import { AppConfigEnum } from './app-config.enum';
import { IAppConfig } from './app-config.interface';
import { NodeEnvEnum } from './node-env.enum';

const ENV = process.env;

export const getNodeEnv = (): NodeEnvEnum =>
  NodeEnvEnum[ENV[AppConfigEnum.NODE_ENV]] || NodeEnvEnum.PRODUCTION;

export const nodeEnvIn = (...env: NodeEnvEnum[]): boolean =>
  env.includes(getNodeEnv());

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
    [AppConfigEnum.POSTGRESQL_CONFIG]: {
      hostname: ENV.POSTGRESQL_HOST,
      username: ENV.POSTGRESQL_USERNAME,
      password: ENV.POSTGRESQL_PASSWORD,
      database: ENV.POSTGRESQL_DATABASE,
      port: +ENV.POSTGRESQL_PORT,
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
