import { Model as ModelMongoose } from 'mongoose';

export const create = (element: any, Model: ModelMongoose<any>): Promise<void> => {
  return new Promise((resolve, reject) => {
    const instance = new Model(element);
    instance.save(err => {
      err ? reject(err) : resolve(instance);
    })
  })
}

export const find = (query: any, model: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    model.find(query, (err, result) => {
      err ? reject(err) : resolve(result.map(cleanItem));
    })
  })
}

export const update = (element: any, Model: ModelMongoose<any>): Promise<void> => {
  return new Promise((resolve, reject) => {
    Model.updateOne({ id: element.id }, element, (err) => {
      if (err) reject(err);
      resolve();
    })
  })
}

export const cleanItem = (item: any): any => {
  const newItem = JSON.parse(JSON.stringify(item));
  delete newItem.__v;
  const id = newItem._id;
  delete newItem._id;
  return { id, ...newItem }
}