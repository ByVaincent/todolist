import {createServer} from 'http';
import app from './app.js'

app.set('port', process.env.PORT || 3000)
const server = createServer(app);
server.listen(process.env.PORT || 3000)


