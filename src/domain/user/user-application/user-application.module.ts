import { Module } from '@nestjs/common';
import { UserDomainModule } from '../user-domain/user-domain.module';
import { UserInfrastructureModule } from '../user-infrastructure/user-infrastructure.module';
import { CqrsModule } from '@nestjs/cqrs';
import { registerUserIndex } from './register-user';
import { refreshTokenIndex } from './refresh-token';
import { loginUserIndex } from './login-user';
import { applicationServiceIndex } from './application-service';
import { createUserIndex } from './create-user';

@Module({
  imports: [UserDomainModule, CqrsModule, UserInfrastructureModule],
  providers: [
    ...createUserIndex,
    ...loginUserIndex,
    ...refreshTokenIndex,
    ...registerUserIndex,
    ...applicationServiceIndex,
  ],
})
export class UserApplicationModule {}
