import { PasswordValueObject } from '../../user-domain/value-object/password.value-object';
import { PasswordHashValueObject } from '../../user-domain/value-object/password-hash.value-object';
import * as bcrypt from 'bcrypt';
import { IPasswordService } from '../../user-domain/ports/password.service';

export class BcryptPasswordHasherAdapter implements IPasswordService {
  private ROUNDS = 10;

  async compare(
    password: PasswordValueObject,
    hash: PasswordHashValueObject,
  ): Promise<boolean> {
    return await bcrypt.compare(password.getValue(), hash.getValue());
  }

  async hash(password: PasswordValueObject): Promise<PasswordHashValueObject> {
    const hash = await bcrypt.hash(password.getValue(), this.ROUNDS);
    return new PasswordHashValueObject(hash);
  }
}
