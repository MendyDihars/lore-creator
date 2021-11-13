import mongoose, { Schema, Model } from 'mongoose';

export default class Lore {
  private _schema = new Schema({
    name: { type: String },
    url: { type: String }
  });

  public get model(): Model<any> {
    return mongoose.models.Lore || mongoose.model('Lore', this._schema);
  }
}