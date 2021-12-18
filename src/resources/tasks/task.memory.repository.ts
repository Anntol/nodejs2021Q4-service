import { ITask } from "./task.model.js";
import * as DB from '../../db/inMemoryDb.js';

const TABLE_NAME = 'Tasks';

const getAll = async (): Promise<ITask[]> => DB.getAllEntities(TABLE_NAME) as ITask[];

const getById = async (id: string): Promise<ITask> => DB.getEntity(TABLE_NAME, id) as ITask;

const add = async (entity: ITask): Promise<ITask> => DB.addEntity(TABLE_NAME, entity) as ITask;

const remove = async (id: string): Promise<boolean> => DB.deleteEntity(TABLE_NAME, id);

const removeByBoardId = async (boardId: string): Promise<void> => DB.deleteTasksByBoardId(boardId);

const unassignUser = async (userId: string): Promise<void> => DB.unassignTasksUser(userId);

const update = async (id: string, entity: ITask): Promise<ITask> => DB.updateEntity(TABLE_NAME, id, entity) as ITask;

export { add, getAll, getById, remove, removeByBoardId, unassignUser, update };
