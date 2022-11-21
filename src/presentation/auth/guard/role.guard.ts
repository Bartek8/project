import {
  Injectable,
  CanActivate,
  ExecutionContext,
  CustomDecorator,
} from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthUser } from '@shared-kernel/auth/auth-user';
import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';
import { ForbiddenException } from '@shared-kernel/exception/forbidden.exception';
import { ExceptionEnum } from '@shared-kernel/exception/exception.enum';

const ROLES_KEY = 'ROLES_KEY';

export const Roles = (...roles: UserRoleEnum[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    if (!roles || roles.length < 1) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: AuthUser = request.user;
    if (!user) {
      throw new ForbiddenException(
        ExceptionEnum.ROLE_REQUIRED,
        'User not found',
      );
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException(
        ExceptionEnum.INSUFFICIENT_ROLE,
        `Required ${roles.length > 1 ? 'roles' : 'role'}: ${roles.join(
          ', ',
        )}. Your role: ${user.role}`,
      );
    }

    return true;
  }
}
