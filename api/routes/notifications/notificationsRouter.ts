import * as express from 'express';

const notificationRouter = express.Router();

notificationRouter.get('/', (req, res) => {
  res.send('Notifications!');
});

notificationRouter

export default notificationRouter;
