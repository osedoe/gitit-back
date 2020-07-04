import * as express from 'express';
import userRouter from './routes/user/userRouter';
import DBManager from './db/database';
import { Config } from './config/Config';
import { UserModel, UserSchema } from './model/User';

DBManager.connect({
  host: Config.getHost(),
  port: Config.getPort(),
  database: Config.getDatabase(),
  username: Config.getUsername(),
  password: Config.getPassword()
}).then(() => {
  DBManager.setModel<UserModel>('user', UserSchema);
  console.log('✅ Succeed!');
}).then(() => {
  const app = express();

  const port = process.env.PORT ?? 3000;

  app.use(express.json());

  /**
   * # V1 - API
   */
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/user', userRouter);

  app.listen(port, () => console.log(`Started listening at http://localhost:${port}`));
})
  .catch((err) => console.error('🔴', err));

