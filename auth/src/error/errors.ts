interface SerializeError {
  message: string;
  field?: string;
}

export abstract class ErrorResult extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ErrorResult.prototype);
  }

  abstract serializeError() : SerializeError[];
}