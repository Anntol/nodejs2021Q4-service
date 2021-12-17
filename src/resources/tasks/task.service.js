const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = () => tasksRepo.getAll();

const getById = (id) => tasksRepo.getById(id);

const add = (task) => tasksRepo.add(new Task(task));

const remove = (id) => tasksRepo.remove(id);

const removeByBoardId = (boardId) => tasksRepo.removeByBoardId(boardId);

const unassignUser = (userId) => tasksRepo.unassignUser(userId);

const update = (id, task) => tasksRepo.update(id, new Task(task));

module.exports = { add, getAll, getById, remove, removeByBoardId, unassignUser, update };
