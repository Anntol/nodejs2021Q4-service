import NotFoundError from "../errors/NotFoundError.js";
import { IUser } from '../resources/users/user.model.js';
import { IBoard } from '../resources/boards/board.model.js';
import { ITask } from '../resources/tasks/task.model.js';

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

const getAllEntities = (tableName: tableNames): tableTypes[] => db[tableName];

const getEntity = (tableName: tableNames, id: string): tableTypes => {
    const entity = db[tableName].filter((item) => item?.id === id);
    if (!entity.length) {
        throw new NotFoundError(`Entity ${id} was not found`);
    }
    return entity[0];
}

const addEntity = (tableName: tableNames, entity: tableTypes): tableTypes => {
    if(!entity) return entity;

    db[tableName].push(entity);

    return getEntity(tableName, entity.id);
}

const deleteEntity = (tableName: tableNames, id: string): boolean => {
    const index = db[tableName].findIndex((item) => item?.id === id);
    if (index >= 0){
        db[tableName].splice(index, 1);
    };
    return true;
};

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

const deleteTasksByBoardId = (boardId: string): void => {
    db.Tasks = db.Tasks.filter((item) => (item as ITask).boardId !== boardId);
}

const unassignTasksUser = (userId: string): void => {
    db.Tasks.forEach((item, index) => {
        if ((item as ITask).userId === userId) {
            (db.Tasks[index] as ITask).userId = null;
        }
    });
}

export { addEntity, deleteEntity, deleteTasksByBoardId, getAllEntities, getEntity, updateEntity, unassignTasksUser }