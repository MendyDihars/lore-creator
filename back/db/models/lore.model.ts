import mongoose, { Schema, Model, model } from 'mongoose';

interface ILore {
  name: string;
  image?: string
}

const schema = new Schema<ILore>({
  name: { type: String, required: true },
  image: { type: String }
});

const createLoreModel = (): Model<any> =>
  mongoose.models.Lore || model<ILore>('Lore', schema);

export default createLoreModel;