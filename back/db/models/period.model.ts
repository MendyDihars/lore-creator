import mongoose, { Schema, Model, model } from 'mongoose';

interface IPeriod {
  name: string;
  position: number;
  lore: Schema.Types.ObjectId;
}

export default class Period {
  private _schema = new Schema<IPeriod>({
    name: { type: String, required: true },
    position: { type: Number, required: true },
    lore: {
      type: Schema.Types.ObjectId,
      ref: 'Lore',
      required: true
    }
  });

  public get model(): Model<any> {
    return mongoose.models.Event || model<IPeriod>('Period', this._schema);
  }
}