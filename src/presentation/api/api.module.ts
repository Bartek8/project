import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { apiGuards } from '../auth/guard';
import { UserController } from '@presentation/api/user/user.controller';
import { AuthController } from '@presentation/api/auth/auth.controller';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { redisModuleConfig } from '@infrastructure/config/redis-module.config';

const apiControllers = [UserController, AuthController, HealthController];

@Module({
  imports: [CqrsModule, HttpModule, TerminusModule, redisModuleConfig()],
  controllers: [...apiControllers],
  providers: [...apiGuards],
})
export class ApiModule {}
