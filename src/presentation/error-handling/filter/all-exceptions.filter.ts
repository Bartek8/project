import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ProblemDetails } from '../problem-details';
import { Response } from 'express';
import { ExceptionEnum } from '@shared-kernel/exception/exception.enum';
import { IRequest } from '@presentation/logging/request.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost): void {
    this.logger.error(exception);
    const ctx = host.switchToHttp();
    const type = ExceptionEnum.INTERNAL_SERVER_ERROR;
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const title = ExceptionEnum.INTERNAL_SERVER_ERROR;
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IRequest>();
    const problemDetails = new ProblemDetails({
      type,
      title,
      status,
      instance: request?.originalUrl,
      traceId: request?.requestId,
    });
    response.status(status).json(problemDetails);
  }
}
