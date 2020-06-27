import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { GetUserAuthRequest } from '../model/requestDefinitions';
import * as dotenv from 'dotenv';

const env = dotenv.config();

export const authorizeUser = (req: GetUserAuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({ message: 'Auth Error' });
  }
  try {
    console.log('🍓', env.parsed?.JWT_KEY);
    const decoded: any = jwt.verify(token, env.parsed?.JWT_KEY as Secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Invalid token' });
  }
};
