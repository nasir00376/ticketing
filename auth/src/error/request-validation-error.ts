import { ErrorResult } from './errors';
import { ValidationError } from 'express-validator';

export class RequestValidationError extends ErrorResult {
  statusCode = 402;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters.')

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map(error => ({ message: error.msg, field: error.param }))
  }
}