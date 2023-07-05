import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';
import { HttpStatusCode } from '../utils/http-status-code.enum';

export class RequestValidationError extends CustomError {
  statusCode = HttpStatusCode.BAD_REQUEST;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return { message: 'Request validation went wrong' };
    });
  }
}
