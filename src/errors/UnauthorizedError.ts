import { StatusCodes } from 'http-status-codes';

class UnauthorizedError extends Error {
  status: number;
  
  /**
   * UnauthorizedError constructor
   * @param message - Error message
   */
  constructor(message = 'Unauthorized') {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
