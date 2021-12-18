import * as tasksRepo from './task.memory.repository.js';
import Task, { ITask } from './task.model.js';

const getAll = () => tasksRepo.getAll();

const getById = (id: string): Promise<ITask> => tasksRepo.getById(id);

const add = (task: ITask): Promise<ITask> => tasksRepo.add(new Task(task));

const remove = (id: string): Promise<boolean> => tasksRepo.remove(id);

const removeByBoardId = (boardId: string): Promise<void> => tasksRepo.removeByBoardId(boardId);

const unassignUser = (userId: string): Promise<void> => tasksRepo.unassignUser(userId);

const update = (id: string, task: ITask): Promise<ITask> => tasksRepo.update(id, new Task(task));

export { add, getAll, getById, remove, removeByBoardId, unassignUser, update };
