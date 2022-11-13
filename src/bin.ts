import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  await CommandFactory.run(AppModule, {
    logger: ['error', 'warn', 'debug'],
  });
}

bootstrap();
