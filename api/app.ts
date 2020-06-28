import * as express from 'express';
import userRouter from './routes/user/userRouter';
import DBManager from './db/database';
import { Config } from './utils/Config';

const dbConfig = {
  host: Config.getHost(),
  port: Config.getPort(),
  database: Config.getDatabase(),
  username: Config.getUsername(),
  password: Config.getPassword()
};

const app = express();

const port = process.env.PORT ?? 3000;

console.log('');
DBManager.connect({
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password
})
  .then(() => console.log('✅ Succeed!'))
  .catch((err) => console.error('🔴', err));

app.use(express.json());

/**
 * # V1 - API
 */
const router = express.Router();
app.use('/api/v1', router);
router.use('/user', userRouter);

app.listen(port, () => console.log(`Started listening at http://localhost:${port}`));
