import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { HttpStatusCode } from '../utils/http-status-code.enum';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res
    .status(HttpStatusCode.INTERNAL_SERVER)
    .json({ errors: [{ message: 'something went wrong!' }] });
};
