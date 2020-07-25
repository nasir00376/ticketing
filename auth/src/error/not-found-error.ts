import { ErrorResult } from './errors';

export class NotFoundError extends ErrorResult {
  statusCode = 404;

  constructor(public reason: string) {
    super('Resource not found.');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return [{ message: this.reason }]
  }
}