import mongoose, { Schema, Model, model } from 'mongoose';

interface IPage {
  name: string;
  content: string;
  images?: string[];
  event?: Schema.Types.ObjectId;
  character?: Schema.Types.ObjectId;
}

export default class Page {
  private _schema = new Schema<IPage>({
    name: { type: String, required: true },
    content: { type: String, required: true },
    images: [
      { type: String }
    ],
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    },
    character: {
      type: Schema.Types.ObjectId,
      ref: 'Character'
    }
  });

  public get model(): Model<any> {
    return mongoose.models.Event || model<IPage>('Page', this._schema);
  }
}