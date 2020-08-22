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

export const requestAllNotifications = async (req: Request, res: Response) => {
  const baseUrl = 'https://api.github.com/';
  const base64Auth = Buffer.from(`${username}:${tokenValue}`, 'binary').toString('base64');

  const response = await fetch(`${baseUrl}${params}`, {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Basic ${base64Auth}`
    } as any
  });

  const body = await response.text();
  res.send(body);
};
