import { Module } from '@nestjs/common';
import { userDomainServices } from './domain-service';
import { UserInfrastructureModule } from '../user-infrastructure/user-infrastructure.module';

@Module({
  imports: [UserInfrastructureModule],
  providers: [...userDomainServices],
  exports: [...userDomainServices],
})
export class UserDomainModule {}
