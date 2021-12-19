import { ITask } from "./task.model.js";
import * as DB from '../../db/inMemoryDb.js';

const TABLE_NAME = 'Tasks';

/**
 * Gets all Task entities.
 * @returns Promise of Array of all Task entities 
 */
const getAll = async (): Promise<ITask[]> => DB.getAllEntities(TABLE_NAME) as ITask[];

/**
 * Gets Task entity by Id
 * @param id - Task Id
 * @returns Promise of Task entity
 */
const getById = async (id: string): Promise<ITask> => DB.getEntity(TABLE_NAME, id) as ITask;

/**
 * Adds Task entity
 * @param entity - Task entity
 * @returns Promise of Task entity
 */
const add = async (entity: ITask): Promise<ITask> => DB.addEntity(TABLE_NAME, entity) as ITask;

/**
 * Removes Task entity
 * @param id - Task Id
 * @returns Promise of boolean type
 */
const remove = async (id: string): Promise<boolean> => DB.deleteEntity(TABLE_NAME, id);

/**
 * Deletes all tasks for the board
 * @param boardId - Board Id
 */
const removeByBoardId = async (boardId: string): Promise<void> => DB.deleteTasksByBoardId(boardId);

/**
 * Updates userId field to null
 * @param userId - User Id
 */
const unassignUser = async (userId: string): Promise<void> => DB.unassignTasksUser(userId);

/**
 * Updates Task entity
 * @param id - Task Id
 * @param entity - Task entity
 * @returns Promise of Task entity
 */
const update = async (id: string, entity: ITask): Promise<ITask> => DB.updateEntity(TABLE_NAME, id, entity) as ITask;

export { add, getAll, getById, remove, removeByBoardId, unassignUser, update };
