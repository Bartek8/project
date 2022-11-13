import { BaseValueObject } from '@shared-kernel/ddd/base.value-object';

export interface IJwtValueObject {
  accessToken: string;
  refreshToken?: string;
}

export class JwtValueObject extends BaseValueObject<IJwtValueObject> {}
