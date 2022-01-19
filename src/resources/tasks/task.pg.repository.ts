import { getRepository } from 'typeorm';
import TaskEntity from '../../entities/task.entity';
import NotFoundError from "../../errors/NotFoundError";
import { ITask } from '../../interfaces/task.interface';

const getTaskRepository = () => getRepository(TaskEntity);

/**
 * Gets all Task entities.
 * @returns Promise of Array of all Task entities 
 */
const getAll = async (): Promise<ITask[]> => getTaskRepository().find();

/**
 * Gets Task entity by Id
 * @param id - Task Id
 * @returns Promise of Task entity
 */
const getById = async (id: string): Promise<ITask> => {
    const task = await getTaskRepository().findOne(id);
    if (!task) {
        throw new NotFoundError(`Entity ${id} was not found`);
    }
    return task;
};

/**
 * Adds Task entity
 * @param entity - Task entity
 * @returns Promise of Task entity
 */
const add = async (entity: ITask): Promise<ITask> => getTaskRepository().save(entity);

/**
 * Removes Task entity
 * @param id - Task Id
 * @returns Promise of boolean type
 */
const removeById = async (id: string): Promise<boolean> => {
    const item = await getById(id);
    if (!item) return false;

    getTaskRepository().delete(id);
    return true;
}

/**
 * Updates Task entity
 * @param id - Task Id
 * @param entity - Task entity
 * @returns Promise of Task entity
 */
const updateById = async (id: string, entity: ITask): Promise<ITask> => {
    let item = await getById(id);
    item = {...entity, id};
    return getTaskRepository().save(item);
}

export { add, getAll, getById, removeById, updateById };
