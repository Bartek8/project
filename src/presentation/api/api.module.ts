import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { apiGuards } from '../auth/guard';
import { UserController } from '@presentation/api/user/user.controller';
import { AuthController } from '@presentation/api/auth/auth.controller';

const apiControllers = [UserController, AuthController];

@Module({
  imports: [CqrsModule, HttpModule],
  controllers: [...apiControllers],
  providers: [...apiGuards],
})
export class ApiModule {}
