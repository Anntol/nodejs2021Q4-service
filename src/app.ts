import fastify, { FastifyReply, FastifyRequest } from "fastify";

// import swaggerUI from 'fastify-swagger';

import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';
import userRouter from './resources/users/user.router.js';

const app = fastify();
// TODO: restore swagger
/* app.register(swaggerUI, {
  exposeRoute: true,
  routePrefix: '/doc',
  swagger: {
    info: { title: 'RS NodeJsQ4 Trello' },
  },
}); */ 

app.get('/', (_:FastifyRequest, reply:FastifyReply) => {
  reply.send('Service is running!');
});

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: 'boards/:boardId/tasks' });

export default app;
