import * as express from 'express';
import { validateLogin, validateSignUp } from '../middleware/validators';
import { requestLogin, requestSignup } from './authRequests';

const authRouter = express.Router();

authRouter.get('/token', (req, res) => {
    res.send('TOKEN');
});

authRouter.post('/signup', validateSignUp, requestSignup);

authRouter.post('/login', validateLogin, requestLogin);

export default authRouter;
