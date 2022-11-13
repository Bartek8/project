import { BaseDto } from '@shared-kernel/type/base.dto';
import { EmailValueObject } from '../value-object/email.value-object';
import { PasswordValueObject } from '../value-object/password.value-object';

export class LoginUserPayloadDto extends BaseDto<LoginUserPayloadDto> {
  email: EmailValueObject;
  password: PasswordValueObject;
}
