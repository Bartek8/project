import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from '@presentation/logging/logging.interceptor';
import { AllExceptionsFilter } from '@presentation/error-handling/all-exceptions.filter';
import { CustomExceptionFilter } from '@presentation/error-handling/custom-error-exception.filter';
import { swaggerLoader } from '@presentation/loaders/swagger.loader';
import { validationPipeOptions } from '@presentation/error-handling/validator.options';
import { HttpExceptionFilter } from '@presentation/error-handling/http-exception.filter';
import { AppConfigEnum } from '@infrastructure/config/app-config.enum';
import { IAppConfig } from '@infrastructure/config/app-config.interface';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    abortOnError: true,
  });
  const logger = new Logger(NestApplication.name);
  const configService = app.get(ConfigService);
  const serverConfig = configService.get<
    IAppConfig[AppConfigEnum.SERVER_CONFIG]
  >(AppConfigEnum.SERVER_CONFIG);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
    new CustomExceptionFilter(),
  );

  swaggerLoader(app);

  await app.listen(serverConfig.port);
  logger.log(`App is listening on ${serverConfig.port}`);

  process.on('unhandledRejection', (err) => {
    logger.error(err);
    process.exit();
  });
}

bootstrap();
