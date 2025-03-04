import * as jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { GetUserAuthRequest } from '../model/requestDefinitions';
import { Config } from '../config/Config';

export const authorizeUser = (req: GetUserAuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({ message: 'Auth Error' });
  }
  try {
    const decoded: any = jwt.verify(token, Config.getJwtKey());
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Invalid token' });
  }
};
