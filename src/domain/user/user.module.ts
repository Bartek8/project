import { Module } from '@nestjs/common';
import { UserApplicationModule } from './user-application/user-application.module';
import { UserDomainModule } from './user-domain/user-domain.module';
import { UserInfrastructureModule } from './user-infrastructure/user-infrastructure.module';
import { UserPresentationModule } from './user-presentation/user-presentation.module';
import { UserContractModule } from './user-contract/user-contract.module';

@Module({
  imports: [
    UserApplicationModule,
    UserDomainModule,
    UserInfrastructureModule,
    UserContractModule,
    UserPresentationModule,
  ],
})
export class UserModule {}
