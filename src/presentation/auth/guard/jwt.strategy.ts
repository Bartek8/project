import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthUser } from '@shared-kernel/auth/auth-user';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { IJwtConfig } from '@infrastructure/config/jwt.interface';
import { AppConfigEnum } from '@infrastructure/config/app-config.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    const jwtConfig = configService.get<IJwtConfig>(AppConfigEnum.JWT_CONFIG);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.accessTokenSecret,
    });
  }

  async validate(payload: Partial<AuthUser>): Promise<AuthUser> {
    return plainToClass(AuthUser, payload);
  }
}
