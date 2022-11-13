import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ExceptionEnum } from '@shared-kernel/exception/exception.enum';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly _reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: Error, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException(ExceptionEnum.UNAUTHORIZED);
    }
    return user;
  }
}
