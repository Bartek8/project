import { BaseDto } from '@shared-kernel/type/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';
import { UserEntityDto } from 'src/domain/user/user-contract/dto/user-entity.dto';

export class UserResponse extends BaseDto<UserResponse> {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ enum: UserRoleEnum })
  role?: UserRoleEnum;

  public static fromDto(dto: UserEntityDto): UserResponse {
    return new UserResponse({
      userId: dto.id,
      email: dto.email,
      createdAt: dto.createdAt,
      role: dto.role,
    });
  }
}
