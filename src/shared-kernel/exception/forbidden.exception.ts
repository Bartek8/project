import { ForbiddenException as Forbidden } from '@nestjs/common';
import { ICustomExceptionResponse } from './custom-exception-response.interface';

export class ForbiddenException extends Forbidden {
  constructor(type: string, description?: string) {
    const response: ICustomExceptionResponse = {
      message: ForbiddenException.name,
      type,
      description,
    };
    super(response);
  }
}
