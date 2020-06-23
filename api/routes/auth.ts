import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { validateUser } from '../middleware/validators';
import { requestSignup } from './authRequests';

const authRouter = express.Router();

authRouter.get('/token', (req, res, next) => {
    res.send('TOKEN');
});

authRouter.post('/signup', validateUser, requestSignup);

authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    // TODO: https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i - point 8
    // Review egghead - watch later playlist
});

export default authRouter;
