import { StatusCodes } from 'http-status-codes';

class ForbiddenError extends Error {
  status: number;
  
  /**
   * ForbiddenError constructor
   * @param message - Error message
   */
  constructor(message = 'Forbidden') {
    super(message);
    this.status = StatusCodes.FORBIDDEN;
  }
}

export default ForbiddenError;
