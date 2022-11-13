import { Provider } from '@nestjs/common';
import { RegisterUserCommandHandler } from './register-user.command-handler';
import { UserRegisteredEventHandler } from './user-registered.event-handler';

export const registerUserIndex: Provider[] = [
  RegisterUserCommandHandler,
  UserRegisteredEventHandler,
];
