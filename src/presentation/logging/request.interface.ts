import { AuthUser } from '@shared-kernel/auth/auth.user';
import { Request } from 'express';

export interface IRequest extends Request {
  requestId: string;
  requestStartTime: number;
  user?: AuthUser;
}
