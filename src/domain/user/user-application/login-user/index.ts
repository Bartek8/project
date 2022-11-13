import { Provider } from '@nestjs/common';
import { LoginUserCommand } from './login-user.command';

export const loginUserIndex: Provider[] = [LoginUserCommand];
