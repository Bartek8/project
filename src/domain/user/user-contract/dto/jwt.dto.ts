import { BaseDto } from '@shared-kernel/type/base.dto';

export class JwtDto extends BaseDto<JwtDto> {
  public readonly accessToken: string;
  public readonly refreshToken?: string;
}
