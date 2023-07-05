import { HttpStatusCode } from '../utils/http-status-code.enum';
import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = HttpStatusCode.NOT_FOUND;

  constructor() {
    super('Route not found!');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}
