import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Response } from 'express';
import { HttpLog } from './http-log';
import { IRequest } from '@presentation/logging/request.interface';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<IRequest>();
    const res = ctx.getResponse<Response>();
    new HttpLog().logRequest(req);
    return next.handle().pipe(tap(() => new HttpLog().logResponse(req, res)));
  }
}
