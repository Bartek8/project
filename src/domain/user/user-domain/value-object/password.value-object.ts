import { BaseValueObject } from '@shared-kernel/ddd/base.value-object';
import { DomainException } from '@shared-kernel/exception/domain.exception';
import { UserDomainExceptionEnum } from '../exception/user-domain-exception.enum';

export class PasswordValueObject extends BaseValueObject<string> {
  public static of(email: string): PasswordValueObject {
    return new PasswordValueObject(email);
  }

  protected validate(password: string): void {
    if (password.length < 8) {
      throw new DomainException(UserDomainExceptionEnum.INVALID_PASSWORD);
    }
  }
}
