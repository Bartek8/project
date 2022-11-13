import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '@shared-kernel/exception/not-found.exception';
import { UserDomainExceptionEnum } from '../../user-domain/exception/user-domain-exception.enum';
import {
  IUserProjectionRepository,
  USER_PROJECTION_REPOSITORY_TOKEN,
} from '../../user-domain/ports/user-projection.repository';
import { UserEntityDto } from '../../user-contract/dto/user-entity.dto';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  constructor(
    @Inject(USER_PROJECTION_REPOSITORY_TOKEN)
    private readonly userEntityRepository: IUserProjectionRepository,
  ) {}
  async execute(query: GetUserByIdQuery): Promise<UserEntityDto> {
    const userDto = await this.userEntityRepository.findOneById(query.userId);

    if (!userDto)
      throw new NotFoundException(UserDomainExceptionEnum.USER_NOT_FOUND);

    return userDto;
  }
}
