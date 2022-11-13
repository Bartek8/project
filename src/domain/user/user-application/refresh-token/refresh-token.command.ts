import { CommandBaseDto } from '@shared-kernel/ddd/command';

export class RefreshTokenCommand extends CommandBaseDto<RefreshTokenCommand> {
  public readonly refreshToken: string;
}
