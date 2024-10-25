import { Request, Response } from 'express';
import { BaseError } from '../utils/error';

export const errorMiddleware = (
  err: BaseError,
  req: Request,
  res: Response
) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({ success: false, message, statusCode });
};
