import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import User, { IUser } from './user.model.js';
import * as usersService from './user.service.js';

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

const getUsers = async (_:FastifyRequest, reply:FastifyReply) => {
  const users = await usersService.getAll();
  reply.code(StatusCodes.OK).send(users.map(User.toResponse));
};

const getUser = async (req:UserRequestWithParams, reply:FastifyReply) => {
  const user = await usersService.getById(req.params.id);
  reply.code(StatusCodes.OK).send(User.toResponse(user));
};

const postUser = async (req:UserRequestWithBody, reply:FastifyReply) => {
  const newUser = await usersService.add(req.body);
  reply.code(StatusCodes.CREATED).send(User.toResponse(newUser));
};

const putUser = async (req:UserRequestWithBodyAndParams, reply:FastifyReply) => {
  const user = await usersService.update(req.params.id, req.body);
  reply.code(StatusCodes.OK).send(User.toResponse(user));
};

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

function usersRoutes(fastify:FastifyInstance, _:FastifyPluginOptions, done: (err?: FastifyError) => void): Promise<unknown> | void {
  fastify.get('/', getUsersOpts);
  fastify.get('/:id', getUserOpts);
  fastify.post('/', postUserOpts);
  fastify.put('/:id', putUserOpts);
  fastify.delete('/:id', deleteUserOpts);

  done();
}

export default usersRoutes;