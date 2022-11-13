import { BaseDto } from '@shared-kernel/type/base.dto';
import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';

export class UserEntityDto extends BaseDto<UserEntityDto> {
  public readonly id: string;
  public readonly email: string;
  public readonly role: UserRoleEnum;
  public readonly createdAt: Date;
}
