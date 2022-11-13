import { BaseDto } from '../type/base.dto';

export interface DomainEvent {}

export abstract class DomainEventDto<T>
  extends BaseDto<T>
  implements DomainEvent {}
