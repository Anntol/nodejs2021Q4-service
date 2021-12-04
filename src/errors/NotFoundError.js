const { StatusCodes } = require('http-status-codes');

class NotFoundError extends Error {
    constructor(message = 'Not found') {
      super(message);
      this.status = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;
