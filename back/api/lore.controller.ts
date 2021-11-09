import BaseController from './base.controller';
import { Router } from 'express';
import Lore from '../db/models/lore.model'
import { ILore } from '../types';

export default class LoreController extends BaseController {
  private _modelLore = new Lore().model;
  
  public get router(): Router {
    const router = Router();
    router.get('/', this.list());
    router.post('/', this.create());
    return router;
  }

  private create() {
    return async (req, res) => {
      const { body } = req;
      const loreInstance = new this._modelLore(body);
      await this.save(loreInstance, res);
      res.status(200).send(this.cleanItem(loreInstance));
    }
  }

  private list() {
    return async (req, res) => {
      const lores: ILore[] = await this.find({}, this._modelLore, res);
      res.status(200).send(lores);
    }
  }
}