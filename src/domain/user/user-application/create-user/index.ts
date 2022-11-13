import { Provider } from '@nestjs/common';
import { CreateUserCommandHandler } from './create-user.command-handler';
import { UserCreatedEventHandler } from './user-created.event-handler';

export const createUserIndex: Provider[] = [
  CreateUserCommandHandler,
  UserCreatedEventHandler,
];
