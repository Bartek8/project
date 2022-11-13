import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ExceptionEnum } from '@shared-kernel/exception/exception.enum';
import { Response } from 'express';
import { ProblemDetails } from '../problem-details';
import { IExceptionResponse } from '@shared-kernel/exception/exception-response.interface';
import { IRequest } from '@presentation/logging/request.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IRequest>();
    const { message, error } = exception.getResponse() as IExceptionResponse;
    const status = exception.getStatus();
    const type = exception.name || ExceptionEnum.UNKNOWN_ERROR;
    const problemDetails = new ProblemDetails({
      type,
      title: exception.name,
      status,
      instance: request.originalUrl,
      traceId: request?.requestId,
      errors: { message, error },
    });
    response.status(status).json(problemDetails);
  }
}
