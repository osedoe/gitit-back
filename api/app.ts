import * as express from 'express'
import github from './routes/githubRequest';
import * as dotenv from 'dotenv';
import authRouter from "./routes/auth";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/github', github)
app.use('/auth', authRouter)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
