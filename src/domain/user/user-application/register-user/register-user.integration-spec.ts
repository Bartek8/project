import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { RegisterUserCommandHandler } from './register-user.command-handler';
import {
  PUBLISHER_PORT_TOKEN,
  PublisherPort,
} from '@shared-kernel/ddd/publisher.port';
import { RegisterUserCommand } from './register-user.command';
import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { UserRegisteredDomainEvent } from '../../user-domain/domain-event/user-registered.domain-event';
import { EmailValueObject } from '../../user-domain/value-object/email.value-object';
import { UserModule } from '../../user.module';
import { Guid } from '@shared-kernel/type/guid.value-object';

describe('Integration specs register user', () => {
  let app: INestApplication;
  let registerUserCommandHandler: RegisterUserCommandHandler;
  let publisher: PublisherPort;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule, InfrastructureModule],
    }).compile();
    app = moduleRef.createNestApplication();

    registerUserCommandHandler = app.get<RegisterUserCommandHandler>(
      RegisterUserCommandHandler,
    );
    publisher = app.get<PublisherPort>(PUBLISHER_PORT_TOKEN);
    jest
      .spyOn(publisher, 'publish')
      .mockImplementation(() => Promise.resolve());
  });

  it('Should register user, emit domain event and return user Dto', async () => {
    await registerUserCommandHandler.execute(
      new RegisterUserCommand({
        email: 'specs@email.com',
        password: 'secret123',
      }),
    );

    expect(publisher.publish).toBeCalledWith(
      new UserRegisteredDomainEvent({
        id: expect.any(Guid),
        email: expect.any(EmailValueObject),
        role: UserRoleEnum.USER,
        createdAt: undefined,
      }),
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });
});
