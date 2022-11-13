import { UserEntityAggregateRoot } from '../entity/user.entity-aggregate-root';
import { Guid } from '@shared-kernel/type/guid.value-object';
import { CreateUserPayloadDto } from '../dto/create-user-payload.dto';
import { EmailValueObject } from '../value-object/email.value-object';
import { PasswordValueObject } from '../value-object/password.value-object';

describe('Unit specs register user on aggregate', () => {
  it('should register user', async () => {
    const userEntity = new UserEntityAggregateRoot(Guid.new());

    expect(
      await userEntity.register(
        new CreateUserPayloadDto({
          email: new EmailValueObject('taken@email.com'),
          password: new PasswordValueObject('secret123'),
        }),
      ),
    ).toBeUndefined();
  });
});
