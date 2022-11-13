import { Provider } from '@nestjs/common';
import { SeedUserModuleCommand } from './seed-user-module.command';

export const cliCommands: Provider[] = [SeedUserModuleCommand];
