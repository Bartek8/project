import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ApplicationModule } from '@presentation/application.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { SharedKernelModule } from '@shared-kernel/shared-kernel.module';
import { RequestMiddleware } from '@presentation/logging/request.middleware';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    ApplicationModule,
    InfrastructureModule,
    DomainModule,
    SharedKernelModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
