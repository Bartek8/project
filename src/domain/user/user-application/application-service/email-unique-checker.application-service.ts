import { EmailValueObject } from '../../user-domain/value-object/email.value-object';
import { DomainException } from '@shared-kernel/exception/domain.exception';
import { UserDomainExceptionEnum } from '../../user-domain/exception/user-domain-exception.enum';
import { Inject } from '@nestjs/common';
import {
  IUserEntityRepository,
  USER_ENTITY_REPOSITORY_TOKEN,
} from '../../user-domain/ports/user-entity.repository';

export class EmailUniqueCheckerApplicationService {
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
