import { Module } from '@nestjs/common';
import { UserInfrastructureModule } from '../user-infrastructure/user-infrastructure.module';
import { GetUserByIdQueryHandler } from './get-user/get-user-by-id.query-handler';
import { ListUsersQueryHandler } from './list-users/list-users.query-handler';

@Module({
  imports: [UserInfrastructureModule],
  providers: [GetUserByIdQueryHandler, ListUsersQueryHandler],
})
export class UserPresentationModule {}
