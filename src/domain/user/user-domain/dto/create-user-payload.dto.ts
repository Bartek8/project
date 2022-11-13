import { BaseDto } from '@shared-kernel/type/base.dto';
import { EmailValueObject } from '../value-object/email.value-object';
import { PasswordHashValueObject } from '../value-object/password-hash.value-object';
import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';

export class CreateUserPayloadDto extends BaseDto<CreateUserPayloadDto> {
  public readonly email: EmailValueObject;
  public readonly password: PasswordHashValueObject;
  public readonly role?: UserRoleEnum;
}
