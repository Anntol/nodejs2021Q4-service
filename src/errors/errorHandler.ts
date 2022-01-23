import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from 'http-status-codes';
import ForbiddenError from "./ForbiddenError";
import notFoundError from './NotFoundError';
import UnauthorizedError from "./UnauthorizedError";

const errorHandler = (err: Error, req: FastifyRequest, reply: FastifyReply) => {
    if ( err) {
        if (err instanceof notFoundError) {
            req.log.warn(err.message);
            reply.status(err.status).send(err.message);
        } else if ( err instanceof UnauthorizedError ||
                    err instanceof ForbiddenError) {
            req.log.error(err.message);
            reply.status(err.status).send(err.message);
        } else {
            req.log.error(err);
            reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    };
};

export default errorHandler;
