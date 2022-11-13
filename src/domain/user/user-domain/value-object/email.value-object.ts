import { BaseValueObject } from '@shared-kernel/ddd/base.value-object';
import { DomainException } from '@shared-kernel/exception/domain.exception';
import { UserDomainExceptionEnum } from '../exception/user-domain-exception.enum';

export class EmailValueObject extends BaseValueObject<string> {
  public static of(email: string): EmailValueObject {
    return new EmailValueObject(email);
  }

  protected validate(email: string): void {
    const validEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );

    if (!validEmail) {
      throw new DomainException(UserDomainExceptionEnum.INVALID_EMAIL_ADDRESS);
    }
  }
}
