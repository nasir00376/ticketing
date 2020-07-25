import { ErrorResult } from './errors';

export class DatabaseError extends ErrorResult {
  statusCode = 500;
  reason: string =  'Error connecting to database.';

  constructor() {
    super('Error connecting db.');

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeError() {
    return [{ message: this.reason }]
  }
}