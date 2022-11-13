import { IntegrationEventDto } from '@shared-kernel/ddd/integration-event';
import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';
import { Type } from 'class-transformer';
import { Guid } from '@shared-kernel/type/guid.value-object';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisteredIntegrationEvent extends IntegrationEventDto<UserRegisteredIntegrationEvent> {
  @Type(() => Guid)
  @ApiProperty()
  public readonly userId: Guid;

  @ApiProperty({ type: UserRoleEnum, enum: UserRoleEnum })
  public readonly userRole: UserRoleEnum;
}
