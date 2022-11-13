import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
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
import { RegisterUserDomainService } from '../../user-domain/domain-service/register-user.domain-service';

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    @Inject(PASSWORD_SERVICE_TOKEN)
    private readonly passwordService: IPasswordService,
    @Inject(USER_ENTITY_REPOSITORY_TOKEN)
    private readonly userEntityRepository: IUserEntityRepository,
    @Inject(PUBLISHER_PORT_TOKEN)
    private readonly publisher: PublisherPort,
    private readonly registerUserDomainService: RegisterUserDomainService,
  ) {}

  public async execute(command: RegisterUserCommand): Promise<void> {
    const { email, password } = command;
    const emailValueObject = new EmailValueObject(email);
    const passwordHashValueObject = await this.passwordService.hash(
      new PasswordValueObject(password),
    );
    const userEntityAggregateRoot =
      await this.registerUserDomainService.register(
        emailValueObject,
        passwordHashValueObject,
      );

    await userEntityAggregateRoot.commit(this.publisher);
  }
}
