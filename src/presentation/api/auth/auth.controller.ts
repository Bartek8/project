import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserRequest } from './request/register-user.request';
import { RegisterUserCommand } from '../../../domain/user/user-application/register-user/register-user.command';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserRequest } from './request/login-user.request';
import { LoginUserCommand } from '../../../domain/user/user-application/login-user/login-user.command';
import { JwtResponse } from './response/jwt.response';
import { RefreshTokenCommand } from '../../../domain/user/user-application/refresh-token/refresh-token.command';
import { RefreshTokenRequest } from '@presentation/api/auth/request/refresh-token.request';

const AUTH_CONTROLLER_NAME = 'auth';

@ApiTags(AUTH_CONTROLLER_NAME)
@Controller(AUTH_CONTROLLER_NAME)
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @Post('register')
  public async register(
    @Body() registerUserRequest: RegisterUserRequest,
  ): Promise<void> {
    await this.commandBus.execute<RegisterUserCommand>(
      new RegisterUserCommand(registerUserRequest),
    );
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: JwtResponse,
  })
  @ApiBadRequestResponse()
  @Post('login')
  public async login(
    @Body() loginUserRequest: LoginUserRequest,
  ): Promise<JwtResponse> {
    const { accessToken, refreshToken } =
      await this.commandBus.execute<LoginUserCommand>(
        new LoginUserCommand(loginUserRequest),
      );

    return new JwtResponse({
      accessToken,
      refreshToken,
    });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: JwtResponse,
  })
  @ApiBadRequestResponse()
  @Post('refresh')
  public async refresh(
    @Body() refreshTokenRequest: RefreshTokenRequest,
  ): Promise<JwtResponse> {
    const jwtDto = await this.commandBus.execute<RefreshTokenCommand>(
      new RefreshTokenCommand(refreshTokenRequest),
    );

    return new JwtResponse({ ...jwtDto });
  }
}
