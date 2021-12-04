const User = require('./user.model');
const usersService = require('./user.service');

const getUsers = async (req, reply) => {
  const users = await usersService.getAll();
  reply.code(200).send(users.map(User.toResponse));
};

const getUser = async (req, reply) => {
  const user = await usersService.getById(req.params.id);
  reply.code(200).send(User.toResponse(user));
};

const postUser = async (req, reply) => {
  const newUser = await usersService.add(req.body);
  reply.code(201).send(User.toResponse(newUser));
};

const putUser = async (req, reply) => {
  const user = await usersService.update(req.params.id, req.body);
  reply.code(200).send(User.toResponse(user));
};

const deleteUser = async (req, reply) => {
  await usersService.remove(req.params.id);
  reply.code(204);
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

function usersRoutes(fastify, options, done) {
  fastify.get('/', getUsersOpts);
  fastify.get('/:id', getUserOpts);
  fastify.post('/', postUserOpts);
  fastify.put('/:id', putUserOpts);
  fastify.delete('/:id', deleteUserOpts);

  done();
}

module.exports = usersRoutes;