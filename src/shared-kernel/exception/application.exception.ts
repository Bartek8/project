import { BadRequestException } from '@nestjs/common';
import { ICustomExceptionResponse } from './custom-exception-response.interface';

export class ApplicationException extends BadRequestException {
  constructor(type: string, description?: string) {
    const response: ICustomExceptionResponse = {
      message: ApplicationException.name,
      type,
      description,
    };
    super(response);
  }
}
