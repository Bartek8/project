import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '@shared-kernel/auth/auth-user';

export const ApiUser = createParamDecorator(
  (data: Partial<AuthUser>, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
