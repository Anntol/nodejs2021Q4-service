import fastify, { FastifyReply, FastifyRequest } from "fastify";
import swagger, { SwaggerOptions } from "fastify-swagger";

import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import userRouter from './resources/users/user.router';
import loginRouter from "./resources/login/login.router";

import logger from "./common/logger";
import errorHandler from "./errors/errorHandler";

const app = fastify({ logger });

app.addHook('preHandler', (req:FastifyRequest, _:FastifyReply, done: () => void) => {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body');
  }
  done();
});

app.get('/', (_:FastifyRequest, reply:FastifyReply) => {
  reply.send('Service is running!');
});

app.register(loginRouter, { prefix: '/login' });
app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: 'boards/:boardId/tasks' });

app.setErrorHandler(errorHandler);

process.on('unhandledRejection', (err: Error) => {
  const { message, stack } = err;
  logger.fatal(`Unhandled rejection occured! ${message}. Stack: ${stack}`);
  process.exit(1);
});

app.get('/rejectionTest', () => {
  Promise.reject(Error('Test promise rejected!'));
});

process.on('uncaughtException', (err: Error) => {
  const { message, stack } = err;
  logger.fatal(`Uncaught exception occured! ${message}. Stack: ${stack}`);
  process.exit(1);
});

app.get('/exceptionTest', () => {
  setTimeout(
    () => {
      throw Error('Test exception thrown!')
    },
    0);
});

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
