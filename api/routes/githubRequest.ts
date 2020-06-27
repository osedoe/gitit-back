import * as express from 'express';

/**
 * @deprecated
 */
const router = express.Router();

router.get('/notifications', (req, res, next) => {
    res.send('123');
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
router.get('/login', (req, res, next) => {
});

export default router;
