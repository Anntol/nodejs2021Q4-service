import fastify, { FastifyReply, FastifyRequest } from "fastify";
import swagger, { SwaggerOptions } from "fastify-swagger";

import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';
import userRouter from './resources/users/user.router.js';

import logger from "./common/logger.js";

const app = fastify({ logger });

app.get('/', (_:FastifyRequest, reply:FastifyReply) => {
  reply.send('Service is running!');
});

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: 'boards/:boardId/tasks' });

const swaggerOpts: SwaggerOptions = {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: './doc/api.yaml',
    baseDir: ''
  }
};
app.register(swagger, swaggerOpts);

export default app;
