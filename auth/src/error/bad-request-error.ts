import { ErrorResult } from './errors';

export class BadRequestError extends ErrorResult {
  statusCode = 400;

  constructor(public reason: string) {
    super('Invalid request parameters.')

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError() {
    return [{ message: this.reason }]
  }
}