import { Provider } from '@nestjs/common';
import { IAuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { Strategy } from 'passport';
import { RolesGuard } from './role.guards';

export const apiGuards: Provider<IAuthGuard | Strategy>[] = [
  JwtAuthGuard,
  JwtStrategy,
  RolesGuard,
];
