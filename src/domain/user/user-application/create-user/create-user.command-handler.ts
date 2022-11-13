import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { EmailValueObject } from '../../user-domain/value-object/email.value-object';
import { PasswordValueObject } from '../../user-domain/value-object/password.value-object';
import {
  IPasswordService,
  PASSWORD_SERVICE_TOKEN,
} from '../../user-domain/ports/password.service';
import { Inject } from '@nestjs/common';
import {
  IUserEntityRepository,
  USER_ENTITY_REPOSITORY_TOKEN,
} from '../../user-domain/ports/user-entity.repository';
import {
  PublisherPort,
  PUBLISHER_PORT_TOKEN,
} from '@shared-kernel/ddd/publisher.port';
import { CreateUserDomainService } from '../../user-domain/domain-service/create-user.domain-service';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @Inject(PASSWORD_SERVICE_TOKEN)
    private readonly passwordService: IPasswordService,
    @Inject(USER_ENTITY_REPOSITORY_TOKEN)
    private readonly userEntityRepository: IUserEntityRepository,
    @Inject(PUBLISHER_PORT_TOKEN)
    private readonly publisher: PublisherPort,
    private readonly createUserDomainService: CreateUserDomainService,
  ) {}

  public async execute(command: CreateUserCommand): Promise<void> {
    const { email, password, role } = command;
    const emailValueObject = new EmailValueObject(email);
    const passwordHashValueObject = await this.passwordService.hash(
      new PasswordValueObject(password),
    );
    const userEntityAggregateRoot = await this.createUserDomainService.create(
      emailValueObject,
      passwordHashValueObject,
      role,
    );

    await userEntityAggregateRoot.commit(this.publisher);
  }
}
