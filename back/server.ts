import express, { Express, Router } from 'express';
import moment from 'moment';
import { config } from 'dotenv';
import { json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { initDB } from './db/db';
import LoreRouter from './api/lore-router';
import EventRouter from './api/event-router';
import path from 'path';

config({
  path: path.resolve(__dirname, '..', '.env')
});

const logger = (req, _, next) => {
  console.log(`${moment().format()} -- ${req.method} - ${req.url} - ${JSON.stringify(req.query)}`)
  next();
}

// Init express

const app: Express = express();

// Middlewares

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "script-src": ["'self'", "'unsafe-eval'"],
    "img-src": ['*']
  }
}));
app.use(cors());
app.use(json());
app.use(logger);

// Database

initDB().then(() => console.log('DB connected'));

// Routers

const router = Router();
router.use('/lores', LoreRouter);
router.use('/events', EventRouter);
app.use('/api', router);

// Web part
const webFolder = path.resolve(__dirname, '..', 'web');
app.use('/public', express.static(path.resolve(webFolder, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(webFolder, 'index.html'));
})

// Run server

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});