import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserModel } from '../../model/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Config } from '../../utils/Config';
import { GetUserAuthRequest } from '../../model/requestDefinitions';
import DBManager from '../../db/database';

export const requestSignup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { email, password, githubToken } = req.body;

  try {
    let user = await DBManager.getInstance().getUserModel().findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists. Please update the token...' });
    }

    const User = DBManager.getInstance().getUserModel();
    user = new User({ email, password, githubToken });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.githubToken = await bcrypt.hash(githubToken, salt);

    await user.save();

    // Attention => "_id"
    const payload = { user: { id: user._id } };

    // TODO: We should have different keys for production and development
    jwt.sign(payload, Config.getJwtKey(), {}, (err, jwtToken) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ jwtToken });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error while saving');
  }
};

export const requestLogin = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  try {
    const user: UserModel | null = await DBManager.getInstance().getUserModel().findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User doesn\'t exist' });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    // Attention => "_id"
    const payload = { user: { id: user._id } };

    jwt.sign(payload, Config.getJwtKey(), {}, (err, jwtToken) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ jwtToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUser = async (req: GetUserAuthRequest, res: Response) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await DBManager.getInstance().getUserModel().findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: 'Error in Fetching user' });
  }
};
