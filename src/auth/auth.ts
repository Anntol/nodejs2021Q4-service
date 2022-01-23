import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import config from '../common/config';
import UnauthorizedError from '../errors/UnauthorizedError';

const verifyToken = (req: FastifyRequest, _: FastifyReply, done: () => void): Promise<unknown> | void => {
    if (!config.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY is missing');
    }

    const bearerToken = req.headers.authorization?.split(" ")[1] || '';
    if (bearerToken) {
        jwt.verify(bearerToken, config.JWT_SECRET_KEY, (err) => {
            if (err) {
                throw new UnauthorizedError('Authorization token is not valid');
            }
        });
    }
    else {
        throw new UnauthorizedError('No authorization token');
    }

    done();
};

export default verifyToken;
