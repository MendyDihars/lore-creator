import mongoose, { Schema, Model, model } from 'mongoose';

interface ILore {
  name: string;
  image?: string
}

export default class Lore {
  private _schema = new Schema<ILore>({
    name: { type: String, required: true },
    image: { type: String }
  });

  public get model(): Model<any> {
    return mongoose.models.Lore || model<ILore>('Lore', this._schema);
  }
}