const app = require('fastify')({ logger: true })
const swaggerUI = require('fastify-swagger');

const boardRouter = require('./resources/boards/board.router');
const userRouter = require('./resources/users/user.router');

app.register(swaggerUI, {
  exposeRoute: true,
  routePrefix: '/doc',
  swagger: {
    info: { title: 'RS NodeJsQ4 Trello' },
  },
});

app.get('/', (req, reply) => {
  reply.send('Service is running!');
});

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });

module.exports = app;
