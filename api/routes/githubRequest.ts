import * as express from 'express';

/**
 * @deprecated
 */
const router = express.Router();

router.get('/notifications', (req, res, next) => {
    res.send('123');
})

router.get('/login', (req, res, next) => {

})

export default router;
