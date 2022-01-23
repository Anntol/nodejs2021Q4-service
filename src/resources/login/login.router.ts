import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../interfaces/user.interface';
import * as loginService from './login.service';

type LoginRequestWithBody = FastifyRequest<{
    Body: Pick<IUser, "login" | "password">;
}>

/**
 * Performs user's sign In.
 * @param req - Fastify request, body contains task json.
 * @param reply - Fastify reply
 */
 const signin = async (req:LoginRequestWithBody, reply:FastifyReply) => {
    const { login, password } = req.body;
    const token = await loginService.signin(login, password);
    reply.status(StatusCodes.OK).send({ token });
};

const signinOpts = {
    handler: signin,
};

/**
 * Login routes handler.
 * @param fastify - Fastify Instance
 * @param _ - Fastify Plugin Options
 * @param done - callback function
 */
 function LoginRoutes(fastify:FastifyInstance, _:FastifyPluginOptions, done: (err?: FastifyError) => void): Promise<unknown> | void {
    fastify.post('/', signinOpts);
  
    done();
  }
  
  export default LoginRoutes;
  