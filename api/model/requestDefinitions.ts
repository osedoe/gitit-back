import { Request } from 'express';

export interface GetUserAuthRequest extends Request {
  user?: any;
}

export interface CustomHeaders {
  Authorization?: string;
  Accept?: string;
  'Content-Type'?: string;
  'Access-Control-Allow-Headers'?: string;
  'Access-Control-Allow-Origin'?: string;
  'Last-Modified'?: string;
  'X-Poll-Interval'?: string;

  [key: string]: any;
}
