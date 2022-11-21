import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtValueObject } from '../../user-domain/value-object/jwt.value-object';
import { AuthUser } from '@shared-kernel/auth/auth-user';
import { ConfigService } from '@nestjs/config';
import { IJwtConfig } from '@infrastructure/config/jwt.interface';
import { AppConfigEnum } from '@infrastructure/config/app-config.enum';
import { IJwtService } from '../../user-domain/ports/jwt.service';

@Injectable()
export class JwtServiceAdapter implements IJwtService {
  private readonly jwtConfig: IJwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = configService.get<IJwtConfig>(AppConfigEnum.JWT_CONFIG);
  }

  async signToken(user: AuthUser): Promise<JwtValueObject> {
    const payload: AuthUser = {
      userId: user.userId,
      role: user.role,
    };

    return new JwtValueObject({
      accessToken: this.jwtService.sign(payload, {
        expiresIn: this.jwtConfig.accessTokenExpirationTime,
      }),
    });
  }

  async signAsync(user: AuthUser): Promise<JwtValueObject> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(user),
      this.jwtService.signAsync(
        {
          sub: user,
        },
        {
          secret: this.jwtConfig.refreshTokenSecret,
          expiresIn: this.jwtConfig.refreshTokenExpirationTime,
        },
      ),
    ]);

    return new JwtValueObject({ accessToken, refreshToken });
  }
}
