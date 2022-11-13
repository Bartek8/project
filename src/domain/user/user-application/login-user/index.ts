import { Provider } from '@nestjs/common';
import { LoginUserCommand } from './login-user.command';
import { LoginUserCommandHandler } from './login-user.command-handler';

export const loginUserIndex: Provider[] = [
  LoginUserCommand,
  LoginUserCommandHandler,
];
