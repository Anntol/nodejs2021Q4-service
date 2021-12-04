const User = require('./user.model');
const usersService = require('./user.service');

const getUsers = async (req, reply) => {
  const users = await usersService.getAll();
  reply.send(users.map(User.toResponse));
};

const getUsersOpts = {
  handler: getUsers,
};

function usersRoutes(fastify, options, done) {
  fastify.get('/', getUsersOpts);

  done();
}

module.exports = usersRoutes;