import { ConfigModule } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common';
import * as Joi from 'joi';
import globalConfig from './config-factory';

export const configProvider = (): DynamicModule => {
  return ConfigModule.forRoot({
    envFilePath: ['.env.local', '.env'],
    isGlobal: true,
    load: [globalConfig],
    validationOptions: {
      abortEarly: true,
    },
    validationSchema: Joi.object({
      APP_PORT: Joi.number().required(),
      APP_HOSTNAME: Joi.string().required(),
      APP_PROTOCOL: Joi.string().required(),
      POSTGRESQL_PORT: Joi.number().required(),
      POSTGRESQL_HOST: Joi.string().required(),
      POSTGRESQL_USERNAME: Joi.string().required(),
      POSTGRESQL_PASSWORD: Joi.string().required(),
      POSTGRESQL_DATABASE: Joi.string().required(),
      ACCESS_TOKEN_SECRET: Joi.string().required(),
      ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
      REFRESH_TOKEN_SECRET: Joi.string().required(),
      REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),
      RABBITMQ_PORT: Joi.number().required(),
      RABBITMQ_HOST: Joi.string().required(),
      RABBITMQ_USERNAME: Joi.string().required(),
      RABBITMQ_PASSWORD: Joi.string().required(),
    }),
  });
};
