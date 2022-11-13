import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListUsersQuery } from './list-users.query';
import { Inject } from '@nestjs/common';
import {
  IUserProjectionRepository,
  USER_PROJECTION_REPOSITORY_TOKEN,
} from '../../user-domain/ports/user-projection.repository';
import { UserEntityDto } from '../../user-contract/dto/user-entity.dto';

@QueryHandler(ListUsersQuery)
export class ListUsersQueryHandler implements IQueryHandler<ListUsersQuery> {
  constructor(
    @Inject(USER_PROJECTION_REPOSITORY_TOKEN)
    private readonly userProjectionRepository: IUserProjectionRepository,
  ) {}

  async execute(query: ListUsersQuery): Promise<UserEntityDto[]> {
    return await this.userProjectionRepository.list();
  }
}
