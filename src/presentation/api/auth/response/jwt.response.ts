import { BaseDto } from '@shared-kernel/type/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class JwtResponse extends BaseDto<JwtResponse> {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken?: string;
}
