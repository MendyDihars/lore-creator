import mongoose, { Schema, Model, model } from 'mongoose';

interface IPeriod {
  name: string;
  position: number;
  lore: Schema.Types.ObjectId;
}

const schema = new Schema<IPeriod>({
  name: { type: String, required: true },
  position: { type: Number, required: true },
  lore: {
    type: Schema.Types.ObjectId,
    ref: 'Lore',
    required: true
  }
});

const createPeriodModel = (): Model<any> =>
  mongoose.models.Period || model<IPeriod>('Period', schema);

export default createPeriodModel;