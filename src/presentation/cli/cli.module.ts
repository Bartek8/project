import { Module } from '@nestjs/common';
import { cliCommands } from './command';
import { CqrsModule } from '@nestjs/cqrs';
import { UserInfrastructureModule } from '../../domain/user/user-infrastructure/user-infrastructure.module';

@Module({
  imports: [UserInfrastructureModule, CqrsModule],
  providers: [...cliCommands],
})
export class CliModule {}
