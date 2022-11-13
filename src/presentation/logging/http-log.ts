import { HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { IRequest } from '@presentation/logging/request.interface';

export class HttpLog {
  private readonly logger = new Logger(HttpLog.name);

  public logRequest(request: IRequest): void {
    const userId = request?.user?.userId;

    let message = `[method: ${request.method}] [path: ${
      request.path
    }] [request-id: ${request.requestId}] [body: ${JSON.stringify(
      request.body || {},
    )}]`;

    if (userId) {
      message = `${message} [user-id: ${userId}]`;
    }
    this.logger.log(message);
  }

  public logResponse(request: IRequest, response: Response): void {
    const message = `[request-id: ${request.requestId}] [status-code: ${
      response.statusCode
    }] [time: ${Date.now() - request.requestStartTime} ms]`;
    const statusCode = response.statusCode;
    switch (true) {
      case statusCode >= HttpStatus.BAD_REQUEST: {
        this.logger.error(message);
        break;
      }
      default: {
        this.logger.log(message);
      }
    }
  }
}
