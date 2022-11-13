import { Injectable, NestMiddleware } from '@nestjs/common';
import { IRequest } from '@presentation/logging/request.interface';
import { Guid } from '@shared-kernel/type/guid.value-object';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: IRequest, res: any, next: () => void): any {
    req.requestId = req.requestId || Guid.new().getValue();
    req.requestStartTime = Date.now();

    next();
  }
}
