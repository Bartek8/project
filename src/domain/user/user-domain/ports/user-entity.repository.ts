import { EmailValueObject } from '../value-object/email.value-object';
import { UserEntityAggregateRoot } from '../entity/user.entity-aggregate-root';
import { Guid } from '@shared-kernel/type/guid.value-object';

export const USER_ENTITY_REPOSITORY_TOKEN = 'USER_ENTITY_REPOSITORY_TOKEN';
export interface IUserEntityRepository {
  findOneByEmail(email: EmailValueObject): Promise<UserEntityAggregateRoot>;
  findOneById(id: Guid): Promise<UserEntityAggregateRoot>;
  persist(
    userEntity: UserEntityAggregateRoot,
  ): Promise<UserEntityAggregateRoot>;
  findOneByRefreshToken(refreshToken: string): Promise<UserEntityAggregateRoot>;
}
