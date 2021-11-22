import mongoose, { Schema, Model, model } from 'mongoose';

interface IEvent {
  name: string;
  period?: Schema.Types.ObjectId;
  image?: string;
  lore: Schema.Types.ObjectId;
}

const schema = new Schema<IEvent>({
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

const createEventModel = (): Model<any> =>
  mongoose.models.Event || model<IEvent>('Event', schema);

export default createEventModel;