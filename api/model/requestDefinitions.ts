import { Request } from 'express';

export interface GetUserAuthRequest extends Request {
  user?: any;
}
