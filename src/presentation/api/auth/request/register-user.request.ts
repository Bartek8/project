import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(8)
  password: string;
}
