import { BaseDto } from '@shared-kernel/type/base.dto';

export class ProblemDetails extends BaseDto<ProblemDetails> {
  type: string;
  title: string;
  detail?: string;
  instance?: string;
  status: number;
  traceId?: string;
  errors?: Record<string, any> | Array<Record<string, any>>;
}
