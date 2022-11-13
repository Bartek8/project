import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InitialUsers } from '../../../../test/data/initial-users';
import { CreateUserCommand } from '../../../domain/user/user-application/create-user/create-user.command';

@Command({
  name: 'seed:user',
  description: 'Seed sample users',
})
export class SeedUserModuleCommand implements CommandRunner {
  private readonly logger = new Logger(SeedUserModuleCommand.name);
  constructor(private readonly commandBus: CommandBus) {}

  async run(): Promise<void> {
    this.logger.debug('Seeding sample users...');
    await this.seedUsers();
    this.logger.debug('Sample users created successfully!');
  }

  private async seedUsers(): Promise<void> {
    await this.commandBus.execute(new CreateUserCommand(InitialUsers.ADMIN));
    await this.commandBus.execute(new CreateUserCommand(InitialUsers.USER));
  }
}
