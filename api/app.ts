import * as express from 'express'
import github from './routes/githubRequest';

const app = express();
const port = process.env.PORT || 3000;


app.use('/github', github)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
