import { CommandBaseDto } from '@shared-kernel/ddd/command';
import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';

export class CreateUserCommand extends CommandBaseDto<CreateUserCommand> {
  public readonly email: string;
  public readonly password: string;
  public readonly role: UserRoleEnum;
}
