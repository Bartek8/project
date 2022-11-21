import { UserRoleEnum } from './user-role.enum';
import { BaseDto } from '../type/base.dto';

export class AuthUser extends BaseDto<AuthUser> {
  public readonly userId: string;
  public readonly role: UserRoleEnum;
}
