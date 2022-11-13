import { BadRequestException } from '@nestjs/common';
import { ICustomExceptionResponse } from './custom-exception-response.interface';

export class InfrastructureException extends BadRequestException {
  constructor(type: string, description?: string) {
    const response: ICustomExceptionResponse = {
      message: InfrastructureException.name,
      type,
      description,
    };
    super(response);
  }
}
