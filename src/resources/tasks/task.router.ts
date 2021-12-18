import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import Task, { ITask } from './task.model.js';
import * as tasksService from './task.service.js';

interface IParams {
  id: string;
}

interface IParamsBoardId {
  boardId: string;
}

type TaskRequestWithBodyAndParams = FastifyRequest<{
  Body: ITask,
  Params: IParams
}>

type TaskRequestWithBodyAndBoardIdParam = FastifyRequest<{
  Body: ITask
  Params: IParamsBoardId
}>

type TaskRequestWithParams = FastifyRequest<{
  Params: IParams
}>

const getTasks = async (_:FastifyRequest, reply:FastifyReply) => {
  const tasks = await tasksService.getAll();
  reply.code(StatusCodes.OK).send(tasks.map(Task.toResponse));
};

const getTask = async (req:TaskRequestWithParams, reply:FastifyReply) => {
  const task = await tasksService.getById(req.params.id);
  reply.code(StatusCodes.OK).send(Task.toResponse(task));
};

const postTask = async (req:TaskRequestWithBodyAndBoardIdParam, reply:FastifyReply) => {
  const newTask = await tasksService.add({ ...req.body, boardId: req.params.boardId });
  reply.code(StatusCodes.CREATED).send(Task.toResponse(newTask));
};

const putTask = async (req:TaskRequestWithBodyAndParams, reply:FastifyReply) => {
  const task = await tasksService.update(req.params.id, req.body);
  reply.code(StatusCodes.OK).send(Task.toResponse(task));
};

const deleteTask = async (req:TaskRequestWithParams, reply:FastifyReply) => {
  await tasksService.remove(req.params.id);
  reply.code(StatusCodes.NO_CONTENT);
};

const getTasksOpts = {
  handler: getTasks,
};

const getTaskOpts = {
  handler: getTask,
};

const postTaskOpts = {
  handler: postTask,
};

const putTaskOpts = {
  handler: putTask,
};

const deleteTaskOpts = {
  handler: deleteTask,
};

function TasksRoutes(fastify:FastifyInstance, _:FastifyPluginOptions, done: (err?: FastifyError) => void): Promise<unknown> | void {
  fastify.get('/', getTasksOpts);
  fastify.get('/:id', getTaskOpts);
  fastify.post('/', postTaskOpts);
  fastify.put('/:id', putTaskOpts);
  fastify.delete('/:id', deleteTaskOpts);

  done();
}

export default TasksRoutes;
