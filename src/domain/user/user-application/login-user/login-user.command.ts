import { CommandBaseDto } from '@shared-kernel/ddd/command';

export class LoginUserCommand extends CommandBaseDto<LoginUserCommand> {
  public readonly email: string;
  public readonly password: string;
}
