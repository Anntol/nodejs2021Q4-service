import { StatusCodes } from 'http-status-codes';

class NotFoundError extends Error {
  status: number;
  
  constructor(message = 'Not found') {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
