import { IValidationError } from '@presentation/error-handling/validation-error.interface';

export interface ICustomExceptionResponse {
  message: string;
  type: string;
  description?: string;
  errors?: IValidationError[] | Record<string, string>;
}
