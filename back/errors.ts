import { Response } from "express";

export class ApiError extends Error {
  public code: number;

  constructor(code: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
  }

  public send(res: Response) {
    res.status(this.code).send(this.message);
  }
}