import { EmailValueObject } from '../value-object/email.value-object';
import { DomainEventDto } from '@shared-kernel/ddd/domain-event';
import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';
import { Guid } from '@shared-kernel/type/guid.value-object';

export class UserRegisteredDomainEvent extends DomainEventDto<UserRegisteredDomainEvent> {
  public readonly id: Guid;
  public readonly email: EmailValueObject;
  public readonly role: UserRoleEnum;
  public readonly createdAt: Date;
}
