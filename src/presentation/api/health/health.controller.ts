import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
  MongooseHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';
import { AppConfigEnum } from '@infrastructure/config/app-config.enum';
import { IAppConfig } from '@infrastructure/config/app-config.interface';
import { RabbitMQHealthIndicator } from '@infrastructure/indicator/rabbitmqhealth.indicator';

@ApiTags('health')
@Controller()
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private readonly configService: ConfigService,
    private readonly rabbitMQHealthIndicator: RabbitMQHealthIndicator,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator,
  ) {}

  @Get('health')
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    const { protocol, hostname, port } = this.configService.get<
      IAppConfig[AppConfigEnum.SERVER_CONFIG]
    >(AppConfigEnum.SERVER_CONFIG);

    return await this.healthCheckService.check([
      (): Promise<HealthIndicatorResult> =>
        this.http.pingCheck('api', `${protocol}://${hostname}:${port}/api`),
      (): Promise<HealthIndicatorResult> =>
        this.rabbitMQHealthIndicator.isHealthy('rabbitmq'),
      (): Promise<HealthIndicatorResult> =>
        this.typeOrmHealthIndicator.pingCheck('typeorm'),
      (): Promise<HealthIndicatorResult> =>
        this.mongooseHealthIndicator.pingCheck('mongodb'),
    ]);
  }

  @Get()
  checkpoint(): void {}
}
