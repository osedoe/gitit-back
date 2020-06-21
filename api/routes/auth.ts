import * as express from 'express'

const authRouter = express.Router()

authRouter.get('/token', (req, res, next) => {
    res.send('TOKEN');
})

authRouter.post('/token', (req, res, next) => {
    const token = req.body.token

    res.send(`Token: ${token}`);
})

export default authRouter;
