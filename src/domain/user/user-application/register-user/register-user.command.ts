import { CommandBaseDto } from '@shared-kernel/ddd/command';

export class RegisterUserCommand extends CommandBaseDto<RegisterUserCommand> {
  public readonly email: string;
  public readonly password: string;
}
