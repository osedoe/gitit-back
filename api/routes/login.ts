import * as express from 'express';
import { validateLogin, validateSignUp } from '../middleware/validators';
import { requestLogin, requestSignup } from './authRequests';

const loginRouter = express.Router();

loginRouter.get('/token', (req, res) => {
  res.send('TOKEN');
});

loginRouter.post('/signup', validateSignUp, requestSignup);

loginRouter.post('/login', validateLogin, requestLogin);

export default loginRouter;
