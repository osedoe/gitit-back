import * as express from 'express'
import github from './routes/githubRequest';
import * as isDev from "electron-is-dev";

if (isDev) {
    console.log('Running in development');
} else {
    console.log('Running in production');
}

const app = express();
const port = process.env.PORT || 3000;


app.use('/github', github)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
