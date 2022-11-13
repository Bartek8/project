import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { CliModule } from '@presentation/cli/cli.module';

@Module({
  imports: [ApiModule, CliModule],
})
export class ApplicationModule {}
