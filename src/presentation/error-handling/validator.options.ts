import { ValidationError, ValidationPipeOptions } from '@nestjs/common';
import { ValidationException } from '@shared-kernel/exception/validation.exception';
import { IValidationError } from './validation-error.interface';

export const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  forbidUnknownValues: true,
  exceptionFactory: (validationErrors) => {
    const errors = validationResponseTransform(validationErrors);
    return new ValidationException(errors);
  },
};

const validationResponseTransform = (
  validationErrors: ValidationError[],
): IValidationError[] => {
  return validationErrors.map((err: ValidationError) => {
    const children =
      err.children && err.children.length !== 0
        ? validationResponseTransform(err.children)
        : undefined;
    const messages = err.constraints
      ? Object.entries(err.constraints).map(([key, value]) => {
          return { message: value, type: key };
        })
      : undefined;
    const property = err.property;
    const response: IValidationError = {
      property,
      messages,
      children,
    };
    return response;
  });
};
