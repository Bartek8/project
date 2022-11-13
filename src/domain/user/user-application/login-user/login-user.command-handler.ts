import { LoginUserCommand } from './login-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmailValueObject } from '../../user-domain/value-object/email.value-object';
import { PasswordValueObject } from '../../user-domain/value-object/password.value-object';
import { LoginUserPayloadDto } from '../../user-domain/dto/login-user-payload.dto';
import { Inject } from '@nestjs/common';
import { DomainException } from '@shared-kernel/exception/domain.exception';
import { UserDomainExceptionEnum } from '../../user-domain/exception/user-domain-exception.enum';
import { JwtDto } from '../../user-contract/dto/jwt.dto';
import {
  IPasswordService,
  PASSWORD_SERVICE_TOKEN,
} from '../../user-domain/ports/password.service';
import {
  IJwtService,
  JWT_SERVICE_TOKEN,
} from '../../user-domain/ports/jwt.service';
import {
  IUserEntityRepository,
  USER_ENTITY_REPOSITORY_TOKEN,
} from '../../user-domain/ports/user-entity.repository';

@CommandHandler(LoginUserCommand)
export class LoginCommandHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject(USER_ENTITY_REPOSITORY_TOKEN)
    private readonly userEntityRepository: IUserEntityRepository,
    @Inject(PASSWORD_SERVICE_TOKEN)
    private readonly passwordService: IPasswordService,
    @Inject(JWT_SERVICE_TOKEN)
    private readonly jwtService: IJwtService,
  ) {}

  public async execute(command: LoginUserCommand): Promise<JwtDto> {
    const { email, password } = command;
    const userEntityAggregateRoot =
      await this.userEntityRepository.findOneByEmail(
        new EmailValueObject(email),
      );
    if (!userEntityAggregateRoot) {
      throw new DomainException(UserDomainExceptionEnum.INVALID_CREDENTIALS);
    }

    await userEntityAggregateRoot.validateUser(
      new LoginUserPayloadDto({
        email: new EmailValueObject(email),
        password: new PasswordValueObject(password),
      }),
      this.passwordService,
    );

    const jwtValueObject = await this.jwtService.signAsync(
      userEntityAggregateRoot.toAuthUser(),
    );

    userEntityAggregateRoot.addToken(jwtValueObject);
    await this.userEntityRepository.persist(userEntityAggregateRoot);

    return new JwtDto({
      accessToken: jwtValueObject.getValue().accessToken,
      refreshToken: jwtValueObject.getValue().refreshToken,
    });
  }
}
