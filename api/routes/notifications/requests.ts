import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { DEFAULT_HEADERS } from '../../utils/variables';
import { Config } from '../../config/Config';

const all = true;
const participating = false;
const since = '';
const before = '';

const username = 'jose.diazg@protonmail.com';
const tokenValue = Config.getAuthToken();

const params = `notifications?all=${all}&participating=${participating}&since=${since}&before=${before}`;

export const requestAllNotifications = (req: Request, res: Response) => {
  const baseUrl = 'https://api.github.com/';
  return fetch(`${baseUrl}${params}`, {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Basic ${btoa(`${username}:${tokenValue}`)}`
    } as any
  }).then(response => response.json());
};
