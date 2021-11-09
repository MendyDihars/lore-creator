import { Response } from 'express';
import mongoose from 'mongoose';

export default class DB {
  public async init(): Promise<void> {
    const { DB_PATH } = process.env;
    await mongoose.connect(DB_PATH);
  }
}