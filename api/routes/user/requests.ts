import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User, { UserModel } from '../../model/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const env = dotenv.config();

export const requestSignup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { email, password, jwtToken: githubToken } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists. Please update the token...' });
    }

    user = new User({ email, password, jwtToken: githubToken });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.githubToken = await bcrypt.hash(githubToken, salt);

    await user.save();

    const payload = { user: { id: user.id } };

    // TODO: We should have different keys for production and development
    jwt.sign(payload, env.parsed?.JWT_KEY as Secret, {}, (err, jwtToken) => {
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
  // TODO: https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i - point 8
  // Review egghead - watch later playlist
  const errors = validationResult(req);
  console.log(123);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  try {
    const user: UserModel | null = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'User doesn\'t exist'
      });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, env.parsed?.JWT_KEY as Secret, {}, (err, jwtToken) => {
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
