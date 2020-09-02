import * as express from 'express';
import userRouter from './routes/user/userRouter';
import DBManager from './db/database';
import { Config } from './config/Config';
import { UserSchema } from './model/User';
import * as morgan from 'morgan';
import notificationRouter from './routes/notifications/notificationsRouter';

const initDB = {
  host: Config.getHost(),
  port: Config.getDbPort(),
  database: Config.getDbName(),
  username: Config.getDbUsername(),
  password: Config.getDbPassword()
};

DBManager.connect(initDB).then(() => {
  DBManager.setModel('user', UserSchema);
  console.log('✅ Succeed!');
}).then(() => {
  const app = express();

  const port = Config.getServerPort();

  if (Config.isDevelopmentEnvironment()) {
    app.use(morgan('tiny'));
  }

  app.use(express.json());

  // V1 - API
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/user', userRouter);
  router.use('/notification', notificationRouter);

  app.listen(port, () => console.log(`Started listening at http://localhost:${port}`));

}).catch((err) => console.error('🔴', err));

