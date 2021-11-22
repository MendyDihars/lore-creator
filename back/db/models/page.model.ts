import mongoose, { Schema, Model, model } from 'mongoose';

interface IPage {
  name: string;
  content: string;
  images?: string[];
  event?: Schema.Types.ObjectId;
  character?: Schema.Types.ObjectId;
}

const schema = new Schema<IPage>({
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

const createPageModel = (): Model<any> =>
  mongoose.models.Event || model<IPage>('Page', schema);

export default createPageModel; 