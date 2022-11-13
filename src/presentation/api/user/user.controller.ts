import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@presentation/auth/guard/jwt-auth.guard';
import { Roles, RolesGuard } from '@presentation/auth/guard/role.guards';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserResponse } from '@presentation/api/user/response/user.response';
import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';
import { ApiUser } from '@presentation/auth/decorator/api-user.decorator';
import { AuthUser } from '@shared-kernel/auth/auth.user';
import { GetUserByIdQuery } from '../../../domain/user/user-presentation/get-user/get-user-by-id.query';
import { ListUsersQuery } from 'src/domain/user/user-presentation/list-users/list-users.query';
import { Guid } from '@shared-kernel/type/guid.value-object';
import { CreateUserRequest } from '@presentation/api/user/request/create-user.request';
import { CreateUserCommand } from 'src/domain/user/user-application/create-user/create-user.command';

const USER_CONTROLLER_NAME = 'user';

@ApiUnauthorizedResponse()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(USER_CONTROLLER_NAME)
@ApiTags(USER_CONTROLLER_NAME)
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

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
  @Get('me')
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

  @ApiCreatedResponse()
  @ApiForbiddenResponse({ description: 'Only for admin' })
  @Post()
  @Roles(UserRoleEnum.ADMIN)
  public async create(@Body() body: CreateUserRequest): Promise<void> {
    const { email, role, password } = body;
    await this.commandBus.execute(
      new CreateUserCommand({
        email,
        role,
        password,
      }),
    );
  }
}
