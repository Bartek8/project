import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({
    example: 'user@project.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password',
  })
  @Length(8)
  password: string;
}
