import { BadRequestException as BadRequest } from '@nestjs/common';
import { ICustomExceptionResponse } from './custom-exception-response.interface';
export class BadRequestException extends BadRequest {
  constructor(type: string, description?: string) {
    const response: ICustomExceptionResponse = {
      message: BadRequestException.name,
      type,
      description,
    };
    super(response);
  }
}
