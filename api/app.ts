import * as express from 'express';
import github from './routes/githubRequest';
import * as dotenv from 'dotenv';
import authRouter from './routes/auth';
import DBManager from './db/database';

const env = dotenv.config();

if (env.error) {
    throw env.error;
}

const dbConfig = {
    host: env.parsed?.HOST ?? 'localhost',
    port: env.parsed?.PORT ?? 27017,
    database: env.parsed?.DATABASE,
    username: env.parsed?.USERNAME,
    password: env.parsed?.PASSWORD
};

const app = express();

const port = process.env.PORT ?? 3000;

DBManager.connect({
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    username: dbConfig.username,
    password: dbConfig.password
});

app.use(express.json());
app.use('/github', github);
app.use('/auth', authRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Started listening at http://localhost:${port}`));
