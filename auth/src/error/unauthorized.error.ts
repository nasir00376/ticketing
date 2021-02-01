import { ErrorResult } from './errors';

export class UnauthorizedError extends ErrorResult {
  statusCode = 401 ;

  constructor() {
    super('Unauthorized.')

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeError() {
    return [{ message: 'Unauthorized' }]
  }
}