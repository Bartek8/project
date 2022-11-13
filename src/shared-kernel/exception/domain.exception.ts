import { BadRequestException } from '@nestjs/common';
import { ICustomExceptionResponse } from './custom-exception-response.interface';

export class DomainException extends BadRequestException {
  constructor(type: string, description?: string) {
    const response: ICustomExceptionResponse = {
      message: DomainException.name,
      type,
      description,
    };
    super(response);
  }
}
