import { JwtValueObject } from '../value-object/jwt.value-object';
import { AuthUser } from '@shared-kernel/auth/auth.user';

export const JWT_SERVICE_TOKEN = 'JWT_SERVICE_TOKEN';

export interface IJwtService {
  signToken(user: AuthUser): Promise<JwtValueObject>;
  signAsync(user: AuthUser): Promise<JwtValueObject>;
}
