import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from 'http-status-codes';
import notFoundError from './NotFoundError';

const errorHandler = (err: Error, req: FastifyRequest, reply: FastifyReply) => {
    if ( err) {
        if (err instanceof notFoundError) {
            req.log.warn(err.message);
            reply.status(err.status).send(err.message);
        } else {
            req.log.error(err);
            reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    };
};

export default errorHandler;