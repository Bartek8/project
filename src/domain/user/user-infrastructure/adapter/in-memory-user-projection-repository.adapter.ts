import { Injectable } from '@nestjs/common';
import { Guid } from '@shared-kernel/type/guid.value-object';
import { UserEntityDto } from '../../user-contract/dto/user-entity.dto';
import { IUserProjectionRepository } from '../../user-domain/ports/user-projection.repository';

@Injectable()
export class InMemoryUserProjectionRepositoryAdapter
  implements IUserProjectionRepository
{
  findOneById(_id: Guid): Promise<UserEntityDto> {
    return Promise.resolve(undefined);
  }

  list(): Promise<UserEntityDto[]> {
    return Promise.resolve([]);
  }
}
