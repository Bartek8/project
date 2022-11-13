import { EmailValueObject } from '../value-object/email.value-object';
import { UserUniqueEmailDomainService } from './user-unique-email.domain-service';
import { Guid } from '@shared-kernel/type/guid.value-object';
import { CreateUserPayloadDto } from '../dto/create-user-payload.dto';
import { PasswordHashValueObject } from '../value-object/password-hash.value-object';
import { UserEntityAggregateRoot } from '../entity/user.entity-aggregate-root';
import {
  IUserEntityRepository,
  USER_ENTITY_REPOSITORY_TOKEN,
} from '../ports/user-entity.repository';
import { Inject } from '@nestjs/common';

export class RegisterUserDomainService {
  constructor(
    @Inject(USER_ENTITY_REPOSITORY_TOKEN)
    private readonly userEntityRepository: IUserEntityRepository,
    private readonly userUniqueEmailDomainService: UserUniqueEmailDomainService,
  ) {}

  public async register(
    email: EmailValueObject,
    password: PasswordHashValueObject,
  ): Promise<UserEntityAggregateRoot> {
    const userEntityAggregateRoot = new UserEntityAggregateRoot(Guid.new());

    await this.userUniqueEmailDomainService.check(email);

    await userEntityAggregateRoot.register(
      new CreateUserPayloadDto({
        email,
        password,
      }),
    );

    await this.userEntityRepository.persist(userEntityAggregateRoot);
    return userEntityAggregateRoot;
  }
}
