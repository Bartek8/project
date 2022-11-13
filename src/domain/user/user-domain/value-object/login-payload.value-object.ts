import { EmailValueObject } from './email.value-object';
import { PasswordValueObject } from './password.value-object';

export class LoginValueObject {
  email: EmailValueObject;
  password: PasswordValueObject;
}
