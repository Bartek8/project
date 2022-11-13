import { Provider } from '@nestjs/common';
import { RefreshTokenCommandHandler } from './refresh-token.command-handler';

export const refreshTokenIndex: Provider[] = [RefreshTokenCommandHandler];
