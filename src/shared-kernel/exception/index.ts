import { ApplicationException } from './application.exception';
import { BadRequestException } from './bad-request.exception';
import { DomainException } from './domain.exception';
import { InfrastructureException } from './infrastructure.exception';
import { NotFoundException } from './not-found.exception';
import { UnauthorizedException } from './unauthorized.exception';
import { ValidationException } from './validation.exception';
import { ForbiddenException } from '@shared-kernel/exception/forbidden.exception';

export const exceptionIndex = [
  ApplicationException,
  DomainException,
  InfrastructureException,
  ValidationException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
];
