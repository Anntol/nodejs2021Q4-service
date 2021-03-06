import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import auth from 'fastify-auth';

import verifyToken from '../../auth/auth';
import User from './user.model';
import { IUser } from '../../interfaces/user.interface';
import * as usersService from './user.service';

interface IParams {
  id: string;
}

type UserRequestWithBodyAndParams = FastifyRequest<{
  Body: IUser,
  Params: IParams
}>

type UserRequestWithBody = FastifyRequest<{
  Body: IUser
}>

type UserRequestWithParams = FastifyRequest<{
  Params: IParams
}>

/**
 * Gets all Users.
 * @param _ - Fastify request
 * @param reply - Fastify reply
 */
const getUsers = async (_:FastifyRequest, reply:FastifyReply) => {
  const users = await usersService.getAll();
  reply.code(StatusCodes.OK).send(users.map(User.toResponse));
};

/**
 * Gets the User.
 * @param req - Fastify request with id parameter
 * @param reply - Fastify reply
 */
const getUser = async (req:UserRequestWithParams, reply:FastifyReply) => {
  const user = await usersService.getById(req.params.id);
  reply.code(StatusCodes.OK).send(User.toResponse(user));
};

/**
 * Adds the User.
 * @param req - Fastify request, body contains user json.
 * @param reply - Fastify reply
 */
const postUser = async (req:UserRequestWithBody, reply:FastifyReply) => {
  const newUser = await usersService.add(req.body);
  reply.code(StatusCodes.CREATED).send(User.toResponse(newUser));
};

/**
 * Updates the User.
 * @param req - Fastify request with id parameter, body contains user json.
 * @param reply - Fastify reply
 */
const putUser = async (req:UserRequestWithBodyAndParams, reply:FastifyReply) => {
  const user = await usersService.update(req.params.id, req.body);
  reply.code(StatusCodes.OK).send(User.toResponse(user));
};

/**
 * Deletes the User.
 * @param req - Fastify request with id parameter
 * @param reply - Fastify reply
 */
const deleteUser = async (req:UserRequestWithParams, reply:FastifyReply) => {
  await usersService.remove(req.params.id);
  reply.code(StatusCodes.NO_CONTENT);
};

const getUsersOpts = {
  handler: getUsers,
};

const getUserOpts = {
  handler: getUser,
};

const postUserOpts = {
  handler: postUser,
};

const putUserOpts = {
  handler: putUser,
};

const deleteUserOpts = {
  handler: deleteUser,
};

const privateUserRoutes = (fastify:FastifyInstance) => { 
  fastify.get('/', { preHandler: fastify.auth([verifyToken]), ...getUsersOpts });
  fastify.get('/:id', { preHandler: fastify.auth([verifyToken]), ...getUserOpts });
  fastify.post('/', { preHandler: fastify.auth([verifyToken]), ...postUserOpts });
  fastify.put('/:id', { preHandler: fastify.auth([verifyToken]), ...putUserOpts });
  fastify.delete('/:id', { preHandler: fastify.auth([verifyToken]), ...deleteUserOpts });
}

/**
 * User routes handler.
 * @param fastify - Fastify Instance
 * @param _ - Fastify Plugin Options
 * @param done - callback function
 */
function usersRoutes(fastify:FastifyInstance, _:FastifyPluginOptions, done: (err?: FastifyError) => void): Promise<unknown> | void {
  fastify.register(auth).after(() => privateUserRoutes(fastify));
  done();
}

export default usersRoutes;