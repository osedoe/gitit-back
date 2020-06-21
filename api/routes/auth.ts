import * as express from 'express'

const router = express.Router()

router.get('/token', (req, res, next) => {
    res.send('TOKEN')
})
