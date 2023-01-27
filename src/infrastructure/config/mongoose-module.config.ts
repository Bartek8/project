import { ConfigService } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common';
import { IAppConfig } from './app-config.interface';
import { AppConfigEnum } from './app-config.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { IMongoConfig } from './mongo-config.interface';

export const mongoDbConnectionString = (
  mongodbConfig: IMongoConfig,
): string => {
  return `mongodb://${mongodbConfig.username}:${mongodbConfig.password}@${mongodbConfig.hostname}:27017/?authMechanism=DEFAULT`;
};

export const mongooseModuleConfig = (): DynamicModule => {
  return MongooseModule.forRootAsync({
    useFactory: async (configService: ConfigService) => {
      return {
        uri: mongoDbConnectionString(
          configService.get<IAppConfig[AppConfigEnum.MONGO_CONFIG]>(
            AppConfigEnum.MONGO_CONFIG,
          ),
        ),
      };
    },
    inject: [ConfigService],
  });
};
