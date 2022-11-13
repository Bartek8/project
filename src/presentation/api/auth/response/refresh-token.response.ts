import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponse {
  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  expirationDate: Date;

  @ApiProperty()
  userId: string;
}
