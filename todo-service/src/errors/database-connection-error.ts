import { HttpStatusCode } from '../utils/http-status-code.enum';
import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = HttpStatusCode.INTERNAL_SERVER;

  constructor() {
    super('Unable to connect database!');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: 'Failed to connect to database' }];
  }
}
