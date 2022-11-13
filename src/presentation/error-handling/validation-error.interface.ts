export interface IValidationError {
  property: string;
  messages?: Array<{ message: string; type: string }>;
  children?: any;
}
