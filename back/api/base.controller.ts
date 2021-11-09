import { Response } from 'express';

export default class BaseController {
  protected save(instance: any, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      instance.save(err => {
        if (err) {
          res.status(400).send(`Something wrong with data ${instance}`)
        } else {
          resolve();
        }
      })
    })
  }

  protected find(query: any, model: any, res: Response): Promise<any> {
    return new Promise((resolve, reject) => {
      model.find(query, (err, result) => {
        if (err) {
          res.status(404).send("Can't find the wanted resource");
          reject(err);
        } else {
          resolve(result.map(this.cleanItem));
        }
      })
    })
  }

  protected cleanItem(item: any): any {
    const newItem = JSON.parse(JSON.stringify(item));
    delete newItem.__v;
    const id = newItem._id;
    delete newItem._id;
    return { id, ...newItem }
  }
}