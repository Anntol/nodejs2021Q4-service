import NotFoundError from "../errors/NotFoundError.js";
import { IUser } from "../interfaces/user.interface.js";
import { IBoard } from '../interfaces/board.interface.js';
import { ITask } from '../interfaces/task.interface.js';

type tableNames = "Users" | "Boards" | "Tasks";
type tableTypes = IUser| IBoard | ITask | undefined;

type memoryDb = {
    [key in tableNames]: tableTypes[]
}

const db: memoryDb = {
    Users: [],
    Boards: [],
    Tasks: []
};

/**
 * Gets all entities from the table in the database
 * @param tableName - The name of the table in the database
 * @returns Array of entities
 */
const getAllEntities = (tableName: tableNames): tableTypes[] => db[tableName];

/**
 * Gets the entity from the database
 * @param tableName - The name of the table in the database
 * @param id - Id of the entity
 * @returns The entity from the database
 */
const getEntity = (tableName: tableNames, id: string): tableTypes => {
    const entity = db[tableName].filter((item) => item?.id === id);
    if (!entity.length) {
        throw new NotFoundError(`Entity ${id} was not found`);
    }
    return entity[0];
}

/**
 * Adds an entity to the table in the database
 * @param tableName - The name of the table in the database
 * @param entity - New entity
 * @returns The added entity from the database
 */
const addEntity = (tableName: tableNames, entity: tableTypes): tableTypes => {
    if(!entity) return entity;

    db[tableName].push(entity);

    return getEntity(tableName, entity.id);
}

/**
 * Deletes the entity from the table in the database
 * @param tableName - The name of the table in the database
 * @param id - Id of the entity
 * @returns Check that deletion was done
 */
const deleteEntity = (tableName: tableNames, id: string): boolean => {
    const index = db[tableName].findIndex((item) => item?.id === id);
    if (index >= 0){
        db[tableName].splice(index, 1);
    };
    return true;
};

/**
 * Updates the entity in the table in the database
 * @param tableName - The name of the table in the database
 * @param id - Id of the entity
 * @param entity - The updated entity
 * @returns The updated entity from the database
 */
const updateEntity = (tableName: tableNames, id: string, entity: tableTypes): tableTypes => {
    if(!entity) return entity;

    const index = db[tableName].findIndex((item) => item?.id === id);
    if (index >= 0){
        const updEntity = entity;
        updEntity.id = id;

        db[tableName][index] = updEntity;
    };

    return getEntity(tableName, id);
}

/**
 * Deletes all tasks for the board
 * @param boardId - BoardId of the entity
 * @returns Check that deletion was done
 */
const deleteTasksByBoardId = (boardId: string): void => {
    db.Tasks = db.Tasks.filter((item) => (item as ITask).boardId !== boardId);
}

/**
 * Updates userId field to null
 * @param userId - UserId of the entity
 */
const unassignTasksUser = (userId: string): void => {
    db.Tasks.forEach((item, index) => {
        if ((item as ITask).userId === userId) {
            (db.Tasks[index] as ITask).userId = null;
        }
    });
}

export { addEntity, deleteEntity, deleteTasksByBoardId, getAllEntities, getEntity, updateEntity, unassignTasksUser }