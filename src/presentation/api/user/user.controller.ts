import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@presentation/auth/guard/jwt-auth.guard';
import { Roles, RolesGuard } from '@presentation/auth/guard/role.guards';
import { QueryBus } from '@nestjs/cqrs';
import { UserResponse } from '@presentation/api/user/response/user.response';
import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';
import { ApiUser } from '@presentation/auth/decorator/api-user.decorator';
import { AuthUser } from '@shared-kernel/auth/auth.user';
import { GetUserByIdQuery } from '../../../domain/user/user-presentation/get-user/get-user-by-id.query';
import { ListUsersQuery } from 'src/domain/user/user-presentation/list-users/list-users.query';
import { Guid } from '@shared-kernel/type/guid.value-object';

const USER_CONTROLLER_NAME = 'user';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(USER_CONTROLLER_NAME)
@ApiTags(USER_CONTROLLER_NAME)
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiResponse({ type: [UserResponse] })
  @Get()
  @Roles(UserRoleEnum.ADMIN)
  async list(): Promise<UserResponse[]> {
    const usersDto = await this.queryBus.execute<ListUsersQuery>(
      new ListUsersQuery(),
    );

    return usersDto.map((userDto) => UserResponse.fromDto(userDto));
  }

  @ApiResponse({ type: UserResponse })
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.USER)
  public async me(@ApiUser() apiUser: AuthUser): Promise<UserResponse> {
    const userEntityDto = await this.queryBus.execute<GetUserByIdQuery>(
      new GetUserByIdQuery({
        userId: new Guid(apiUser.userId),
      }),
    );

    return new UserResponse({
      ...userEntityDto,
    });
  }
}
