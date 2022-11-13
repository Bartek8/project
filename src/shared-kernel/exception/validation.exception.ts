import { BadRequestException } from '@nestjs/common';
import { IValidationError } from '@presentation/error-handling/validation-error.interface';
import { ICustomExceptionResponse } from './custom-exception-response.interface';
import { ExceptionEnum } from './exception.enum';

export class ValidationException extends BadRequestException {
  constructor(errors: IValidationError[]) {
    const response: ICustomExceptionResponse = {
      message: ValidationException.name,
      type: ExceptionEnum.VALIDATION_ERROR,
      errors,
    };
    super(response);
  }
}
