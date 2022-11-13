import { Injectable } from '@nestjs/common';
import { UserEntityAggregateRoot } from '../../user-domain/entity/user.entity-aggregate-root';
import { EmailValueObject } from '../../user-domain/value-object/email.value-object';
import { Guid } from '@shared-kernel/type/guid.value-object';
import { IUserEntityRepository } from '../../user-domain/ports/user-entity.repository';

@Injectable()
export class InMemoryUserEntityRepositoryAdapter
  implements IUserEntityRepository
{
  private users: UserEntityAggregateRoot[] = [];

  async findOneByEmail(
    email: EmailValueObject,
  ): Promise<UserEntityAggregateRoot> {
    return this.users.find(
      (user) => user.toPlain().email.getValue() === email.getValue(),
    );
  }

  async persist(
    userEntity: UserEntityAggregateRoot,
  ): Promise<UserEntityAggregateRoot> {
    Object.assign(userEntity, {
      createdAt: new Date(),
    });
    this.users.push(userEntity);
    return userEntity;
  }

  findOneById(id: Guid): Promise<UserEntityAggregateRoot> {
    return Promise.resolve(undefined);
  }

  async findOneByRefreshToken(
    refreshToken: string,
  ): Promise<UserEntityAggregateRoot> {
    return Promise.resolve(undefined);
  }
}
