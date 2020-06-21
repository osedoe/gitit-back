import * as express from 'express';
import { validateUser } from '../middleware/validators';
import { requestSignup } from './authRequests';

const authRouter = express.Router();

authRouter.get('/token', (req, res, next) => {
    res.send('TOKEN');
});

authRouter.post('/signup', validateUser, requestSignup);

authRouter.post('login', () => {
    // TODO: https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i - point 8
});

export default authRouter;
