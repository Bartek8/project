import { EmailValueObject } from '../value-object/email.value-object';
import { DomainException } from '@shared-kernel/exception/domain.exception';
import { UserDomainExceptionEnum } from '../exception/user-domain-exception.enum';
import { Inject } from '@nestjs/common';
import {
  IUserEntityRepository,
  USER_ENTITY_REPOSITORY_TOKEN,
} from '../ports/user-entity.repository';

export class UserUniqueEmailDomainService {
  constructor(
    @Inject(USER_ENTITY_REPOSITORY_TOKEN)
    private readonly userEntityRepository: IUserEntityRepository,
  ) {}

  public async check(email: EmailValueObject): Promise<void> {
    const userExists = !!(await this.userEntityRepository.findOneByEmail(
      email,
    ));

    if (userExists) {
      throw new DomainException(UserDomainExceptionEnum.EMAIL_TAKEN);
    }
  }
}
