import { HttpStatusCode } from '../utils/http-status-code.enum';
import { CustomError } from './custom-error';

export class TodoNotFoundError extends CustomError {
  statusCode = HttpStatusCode.NOT_FOUND;

  constructor() {
    super('Todo not found!');
    Object.setPrototypeOf(this, TodoNotFoundError.prototype);
  }
  serializeErrors() {
    return [{ message: 'Todo Not Found' }];
  }
}
