import { PasswordValueObject } from '../value-object/password.value-object';
import { PasswordHashValueObject } from '../value-object/password-hash.value-object';

export const PASSWORD_SERVICE_TOKEN = 'PASSWORD_SERVICE_TOKEN';

export interface IPasswordService {
  hash(password: PasswordValueObject): Promise<PasswordHashValueObject>;
  compare(
    password: PasswordValueObject,
    hash: PasswordHashValueObject,
  ): Promise<boolean>;
}
