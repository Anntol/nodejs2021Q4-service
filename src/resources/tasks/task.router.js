const { StatusCodes } = require('http-status-codes');
const Task = require('./task.model');
const tasksService = require('./task.service');

const getTasks = async (req, reply) => {
  const tasks = await tasksService.getAll();
  reply.code(StatusCodes.OK).send(tasks.map(Task.toResponse));
};

const getTask = async (req, reply) => {
  const task = await tasksService.getById(req.params.id);
  reply.code(StatusCodes.OK).send(Task.toResponse(task));
};

const postTask = async (req, reply) => {
  const newTask = await tasksService.add({ ...req.body, TaskId: req.params.TaskId });
  reply.code(StatusCodes.CREATED).send(Task.toResponse(newTask));
};

const putTask = async (req, reply) => {
  const task = await tasksService.update(req.params.id, req.body);
  reply.code(StatusCodes.OK).send(Task.toResponse(task));
};

const deleteTask = async (req, reply) => {
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

function TasksRoutes(fastify, options, done) {
  fastify.get('/', getTasksOpts);
  fastify.get('/:id', getTaskOpts);
  fastify.post('/', postTaskOpts);
  fastify.put('/:id', putTaskOpts);
  fastify.delete('/:id', deleteTaskOpts);

  done();
}

module.exports = TasksRoutes;
