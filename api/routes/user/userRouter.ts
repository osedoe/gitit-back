import * as express from 'express';
import { Response } from 'express';
import { validateLogin, validateSignUp } from '../../middleware/validators';
import { requestLogin, requestSignup } from './requests';
import { authorizeUser } from '../../middleware/auth';
import User from '../../model/User';
import { GetUserAuthRequest } from '../../model/requestDefinitions';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('All OK!');
});
/**
 * @description Signup an user - It asks for an email and a github access token
 * @param path /api/v1/user/signup
 * @param body - email: string
 *               token: string
 */
userRouter.post('/signup', validateSignUp, requestSignup);

/**
 * @description Login -
 */
userRouter.post('/login', validateLogin, requestLogin);

userRouter.get('/me', authorizeUser, async (req: GetUserAuthRequest, res: Response) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: 'Error in Fetching user' });
  }
});

export default userRouter;
