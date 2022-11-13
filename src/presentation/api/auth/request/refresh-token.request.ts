import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsString } from 'class-validator';

export class RefreshTokenRequest {
  @ApiProperty()
  @IsJWT()
  @IsString()
  refreshToken: string;
}
