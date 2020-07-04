import * as express from 'express';
import userRouter from './routes/user/userRouter';
import DBManager from './db/database';
import { Config } from './config/Config';
import { UserModel, UserSchema } from './model/User';
import * as morgan from 'morgan';

DBManager.connect({
  host: Config.getHost(),
  port: Config.getDbPort(),
  database: Config.getDbName(),
  username: Config.getDbUsername(),
  password: Config.getDbPassword()
}).then(() => {
  DBManager.setModel<UserModel>('user', UserSchema);
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

  app.listen(port, () => console.log(`Started listening at http://localhost:${port}`));

}).catch((err) => console.error('🔴', err));

