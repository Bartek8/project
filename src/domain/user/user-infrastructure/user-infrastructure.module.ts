import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userInfrastructureAdapters } from './adapter';
import { TypeormUserEntity } from './database/typeorm-user.entity';
import { infrastructureRequired } from '@infrastructure/config/config-factory';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeormRefreshTokenEntity } from './database/typeorm-refresh-token.entity';
import { IJwtConfig } from '@infrastructure/config/jwt.interface';
import { AppConfigEnum } from '@infrastructure/config/app-config.enum';

const imports = [
  JwtModule.registerAsync({
    useFactory: (config: ConfigService) => {
      const jwtConfig = config.get<IJwtConfig>(AppConfigEnum.JWT_CONFIG);
      return {
        secret: jwtConfig.accessTokenSecret,
        signOptions: {
          expiresIn: jwtConfig.accessTokenExpirationTime,
        },
      };
    },
    inject: [ConfigService],
  }),
];

infrastructureRequired() &&
  imports.push(
    TypeOrmModule.forFeature([TypeormUserEntity, TypeormRefreshTokenEntity]),
  );

@Module({
  imports: [...imports],
  providers: [...userInfrastructureAdapters],
  exports: [...userInfrastructureAdapters],
})
export class UserInfrastructureModule {}
