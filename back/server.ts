import express, { Express, Router } from 'express';
import moment from 'moment';
import { config } from 'dotenv';
import { json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import DB from './db/db';
import LoreController from './api/lore.controller';
import path from 'path';

config({
  path: path.resolve(__dirname, '..', '.env')
});

class Server {
  private _app: Express = express();
  private _db: DB;
  
  constructor() {
    this.initMiddlewares();
    this.initDatabase();
    this.initRouters();
    this.initWeb();
  }

  private initWeb(): void {
    const webFolder = path.resolve(__dirname, '..', 'web')
    this._app.use('/public', express.static(path.resolve(webFolder, 'public')));
    this._app.get('/', (req, res) => {
      res.sendFile(path.resolve(webFolder, 'index.html'))
    })
  }

  private initRouters(): void {
    const router = Router();
    router.use('/lores', new LoreController().router);
    this._app.use('/api', router);
  }

  private initDatabase(): void {
    this._db = new DB();
    this._db.init()
      .then(() => console.log('DB connected'));
  }

  private initMiddlewares(): void {
    this._app.use(helmet());
    this._app.use(helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "'unsafe-eval'"]
      }
    }));
    this._app.use(cors());
    this._app.use(json());
    this._app.use(this.logger());
  }

  private logger() {
    return  (req, _, next) => {
      console.log(`${moment().format()} -- ${req.method} - ${req.url} - ${req.query}`)
      next();
    }
  }

  public run(): void {
    const { PORT } = process.env;
    this._app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    })
  }
}

new Server().run();