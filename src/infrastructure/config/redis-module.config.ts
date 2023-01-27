import {
  CacheModule,
  CacheModuleOptions,
  CacheStore,
  DynamicModule,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { AppConfigEnum } from './app-config.enum';
import { IAppConfig } from './app-config.interface';

export const redisModuleConfig = (): DynamicModule => {
  return CacheModule.registerAsync<RedisClientOptions>({
    useFactory: (configService: ConfigService): CacheModuleOptions => {
      const redisConfig = configService.get<
        IAppConfig[AppConfigEnum.REDIS_CONFIG]
      >(AppConfigEnum.REDIS_CONFIG);
      return {
        isGlobal: true,
        store: redisStore as unknown as CacheStore,
        host: redisConfig.host,
        port: redisConfig.port,
        username: redisConfig.username,
        password: redisConfig.password,
        no_ready_check: true,
        ttl: 5,
      };
    },
    inject: [ConfigService],
  });
};
