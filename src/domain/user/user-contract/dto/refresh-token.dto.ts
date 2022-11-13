import { BaseDto } from '@shared-kernel/type/base.dto';

export class RefreshTokenDto extends BaseDto<RefreshTokenDto> {
  public readonly refreshToken: string;
  public readonly expirationDate: Date;
  public readonly userId: string;
}
