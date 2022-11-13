import { UnauthorizedException as Unauthorized } from '@nestjs/common';
import { ICustomExceptionResponse } from './custom-exception-response.interface';

export class UnauthorizedException extends Unauthorized {
  constructor(type: string, description?: string) {
    const response: ICustomExceptionResponse = {
      message: UnauthorizedException.name,
      type,
      description,
    };
    super(response);
  }
}
