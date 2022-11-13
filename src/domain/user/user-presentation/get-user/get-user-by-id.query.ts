import { QueryBaseDto } from '@shared-kernel/ddd/query';
import { Guid } from '@shared-kernel/type/guid.value-object';

export class GetUserByIdQuery extends QueryBaseDto<GetUserByIdQuery> {
  userId: Guid;
}
