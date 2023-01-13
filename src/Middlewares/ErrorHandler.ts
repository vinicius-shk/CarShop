import { NextFunction, Request, Response } from 'express';
import HttpError from '../Utils/HttpError';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { status, message } = error as HttpError;
    res.status(status || 500).json({ message });
    next();
  }
}

export default ErrorHandler;