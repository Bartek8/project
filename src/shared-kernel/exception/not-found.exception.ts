import { NotFoundException as NotFound } from '@nestjs/common';
import { ICustomExceptionResponse } from './custom-exception-response.interface';

export class NotFoundException extends NotFound {
  constructor(type: string, description?: string) {
    const response: ICustomExceptionResponse = {
      message: NotFoundException.name,
      type,
      description,
    };
    super(response);
  }
}
