import express, { Express } from 'express';
import moment from 'moment';
import { config } from 'dotenv';
import { json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import DB from './db/db';
import LoreController from './api/lore.controller';

config();

class Server {
  private _app: Express = express();
  private _db: DB;
  
  constructor() {
    this.initMiddlewares();
    this.initDatabase();
    this.initRouters();
  }

  private initRouters(): void {
    this._app.use('/lores', new LoreController().router);
  }

  private initDatabase(): void {
    this._db = new DB();
    this._db.init()
      .then(() => console.log('DB connected'));
  }

  private initMiddlewares(): void {
    this._app.use(helmet());
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