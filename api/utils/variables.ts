import { CustomHeaders } from '../model/requestDefinitions';

export const DEFAULT_HEADERS: CustomHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'X-Requested-With',
  'Access-Control-Allow-Origin': '*'
};
