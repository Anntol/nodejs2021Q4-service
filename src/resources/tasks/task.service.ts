import * as tasksRepo from './task.pg.repository';
import Task from './task.model';
import { ITask } from '../../interfaces/task.interface';

/**
 * Gets all Task entities.
 * @returns Promise of Array of all Task entities 
 */
const getAll = () => tasksRepo.getAll();

/**
 * Gets Task entity by Id
 * @param id - Task Id
 * @returns Promise of Task entity
 */
const getById = (id: string): Promise<ITask> => tasksRepo.getById(id);

/**
 * Adds Task entity
 * @param entity - Task entity
 * @returns Promise of Task entity
 */
const add = (task: ITask): Promise<ITask> => tasksRepo.add(new Task(task));

/**
 * Removes Task entity
 * @param id - Task Id
 * @returns Promise of boolean type
 */
const remove = (id: string): Promise<boolean> => tasksRepo.removeById(id);

/**
 * Deletes all tasks for the board
 * @param boardId - Board Id
 */
// const removeByBoardId = (boardId: string): Promise<void> => tasksRepo.removeByBoardId(boardId);

/**
 * Updates userId field to null
 * @param userId - User Id
 */
// const unassignUser = (userId: string): Promise<void> => tasksRepo.unassignUser(userId);

/**
 * Updates Task entity
 * @param id - Task Id
 * @param entity - Task entity
 * @returns Promise of Task entity
 */
const update = (id: string, task: ITask): Promise<ITask> => tasksRepo.updateById(id, new Task(task));

export { add, getAll, getById, remove, update };
