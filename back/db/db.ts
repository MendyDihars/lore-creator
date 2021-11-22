import mongoose from 'mongoose';

export const initDB = async (): Promise<void> => {
  const { DB_PATH } = process.env;
  await mongoose.connect(DB_PATH);
}