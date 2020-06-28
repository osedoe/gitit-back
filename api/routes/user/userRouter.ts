import * as express from 'express';
import { validateLogin, validateSignUp } from '../../middleware/validators';
import { getUser, requestLogin, requestSignup } from './requests';
import { authorizeUser } from '../../middleware/auth';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('All OK!');
});
/**
 * @description Signup a user
 * @param path - /api/v1/user/signup
 * @param body - email: string
 *               password: string
 */
userRouter.post('/signup', validateSignUp, requestSignup);

/**
 * @description Sign in a user
 * @param path - /api/v1/user/login
 * @param body - email: string
 *               password: string
 */
userRouter.post('/login', validateLogin, requestLogin);

/**
 * @description Gets the user information
 * @param path - /api/v1/user/me
 * @param headers - Content-Type: application/json
 *                  token: jwtToken
 */
userRouter.get('/me', authorizeUser, getUser);

export default userRouter;
