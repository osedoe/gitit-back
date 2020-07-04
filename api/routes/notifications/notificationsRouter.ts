import * as express from 'express';
import { requestAllNotifications } from './requests';

const notificationRouter = express.Router();

notificationRouter.get('/', (req, res) => {
  res.send('Notifications!');
});

notificationRouter.get('/all', requestAllNotifications);

export default notificationRouter;
