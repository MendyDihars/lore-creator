import mongoose, { Schema, Model, model } from 'mongoose';

interface IEvent {
  name: string;
  period?: Schema.Types.ObjectId;
  image?: string;
  lore: Schema.Types.ObjectId;
}

export default class Event {
  private _schema = new Schema<IEvent>({
    name: { type: String, required: true },
    period: {
      type: Schema.Types.ObjectId,
      ref: 'Period'
    },
    image: { type: String },
    lore: {
      type: Schema.Types.ObjectId,
      ref: "Lore",
      required: true
    }
  });

  public get model(): Model<any> {
    return mongoose.models.Event || model<IEvent>('Event', this._schema);
  }
}