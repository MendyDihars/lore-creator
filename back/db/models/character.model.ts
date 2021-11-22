import mongoose, { Schema, Model, model } from 'mongoose';

interface ICharacter {
  name:  string;
  class: string;
  race: string;
  age: number;
  player?: string;
  lore: Schema.Types.ObjectId;
}

const schema = new Schema<ICharacter>({
  name: { type: String, required: true },
  class: { type: String, required: true },
  race: { type: String, required: true },
  age: { type: Number, required: true },
  player: { type: String },
  lore: {
    type: Schema.Types.ObjectId,
    ref: 'Lore',
    required: true
  }
});

const createCharacterModel = (): Model<any> =>
  mongoose.models.Character || model<ICharacter>('Character', schema);

export default createCharacterModel;