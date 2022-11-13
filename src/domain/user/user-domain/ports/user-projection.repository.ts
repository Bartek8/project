import { Guid } from '@shared-kernel/type/guid.value-object';
import { UserEntityDto } from '../../user-contract/dto/user-entity.dto';

export const USER_PROJECTION_REPOSITORY_TOKEN =
  'USER_PROJECTION_REPOSITORY_TOKEN';

export interface IUserProjectionRepository {
  findOneById(id: Guid): Promise<UserEntityDto>;
  list(): Promise<UserEntityDto[]>;
}
