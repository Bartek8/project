import { BaseDto } from '../type/base.dto';

export interface IntegrationEvent {}

export abstract class IntegrationEventDto<T>
  extends BaseDto<T>
  implements IntegrationEvent {}
