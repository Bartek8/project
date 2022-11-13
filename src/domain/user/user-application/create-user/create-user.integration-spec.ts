import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CreateUserCommandHandler } from './create-user.command-handler';
import {
  PUBLISHER_PORT_TOKEN,
  PublisherPort,
} from '@shared-kernel/ddd/publisher.port';
import { CreateUserCommand } from './create-user.command';
import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { EmailValueObject } from '../../user-domain/value-object/email.value-object';
import { UserModule } from '../../user.module';
import { Guid } from '@shared-kernel/type/guid.value-object';
import { UserCreatedDomainEvent } from '../../user-domain/domain-event/user-created.domain-event';

describe('Integration spec create user', () => {
  let app: INestApplication;
  let createUserCommandHandler: CreateUserCommandHandler;
  let publisher: PublisherPort;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule, InfrastructureModule],
    }).compile();
    app = moduleRef.createNestApplication();

    createUserCommandHandler = app.get<CreateUserCommandHandler>(
      CreateUserCommandHandler,
    );
    publisher = app.get<PublisherPort>(PUBLISHER_PORT_TOKEN);
    jest
      .spyOn(publisher, 'publish')
      .mockImplementation(() => Promise.resolve());
  });

  it('Should create user, emit domain event and return user dto', async () => {
    await createUserCommandHandler.execute(
      new CreateUserCommand({
        email: 'spec@email.com',
        password: 'secret123',
        role: UserRoleEnum.ADMIN,
      }),
    );

    expect(publisher.publish).toBeCalledWith(
      new UserCreatedDomainEvent({
        id: expect.any(Guid),
        email: expect.any(EmailValueObject),
        role: UserRoleEnum.ADMIN,
        createdAt: undefined,
      }),
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });
});
