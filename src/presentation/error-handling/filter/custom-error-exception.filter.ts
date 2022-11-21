import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { exceptionIndex } from '@shared-kernel/exception';
import { ICustomExceptionResponse } from '@shared-kernel/exception/custom-exception-response.interface';
import { ExceptionEnum } from '@shared-kernel/exception/exception.enum';
import { Response } from 'express';
import { ProblemDetails } from '../problem-details';
import { IRequest } from '@presentation/logging/request.interface';
import { handleLogging } from '@presentation/error-handling/handle-logging';

@Catch(...exceptionIndex)
export class CustomExceptionFilter implements ExceptionFilter {
  logger = new Logger(CustomExceptionFilter.name);

  catch(httpException: HttpException, host: ArgumentsHost): void {
    const exceptionResponse =
      httpException.getResponse() as ICustomExceptionResponse;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IRequest>();
    const status = httpException.getStatus();
    const problemDetails = new ProblemDetails({
      type: exceptionResponse.type || ExceptionEnum.UNKNOWN_ERROR,
      title: exceptionResponse.message || ExceptionEnum.UNKNOWN_ERROR,
      detail: exceptionResponse?.description,
      status,
      instance: request?.originalUrl,
      traceId: request?.requestId,
      errors: exceptionResponse?.errors,
    });
    handleLogging(this.logger, status, problemDetails);
    response.status(status).json(problemDetails);
  }
}
