import { getRepository } from 'typeorm';
import NotFoundError from "../../errors/NotFoundError";
import ForbiddenError from '../../errors/ForbiddenError';
import UserEntity from "../../entities/user.entity";
import { IUser } from '../../interfaces/user.interface';

const getUserRepository = () => getRepository(UserEntity);

/**
 * Gets all User entities.
 * @returns Promise of Array of all User entities 
 */
const getAll = async (): Promise<IUser[]> => getUserRepository().find();

/**
 * Gets User entity by Id
 * @param id - User Id
 * @returns Promise of User entity
 */
const getById = async (id: string): Promise<IUser> => {
    const user = await getUserRepository().findOne(id);
    if (!user) {
        throw new NotFoundError(`Entity ${id} was not found`);
    }
    return user;
}

/**
 * Gets User entity by login
 * @param login - User login
 * @returns Promise of User entity
 */
 const getByLogin = async (login: string): Promise<IUser> => {
    const user = await getUserRepository().findOne({ where: { login } });
    if (!user) {
        throw new ForbiddenError("User was not found!")
    }
    return user;
}

/**
 * Adds User entity
 * @param entity - User entity
 * @returns Promise of User entity
 */
const add = async (entity: IUser): Promise<IUser> => getUserRepository().save(entity);

/**
 * Removes User entity
 * @param id - User Id
 * @returns Promise of boolean type
 */
const removeById = async (id: string): Promise<boolean> => {
    const item = await getById(id);
    if (!item) return false;

    getUserRepository().delete(id);
    return true;
}

/**
 * Updates User entity
 * @param id - User Id
 * @param entity - User entity
 * @returns Promise of User entity
 */
const updateById = async (id: string, entity: IUser): Promise<IUser> => {
    let item = await getById(id);
    item = {...entity, id};
    return getUserRepository().save(item);
}

export { add, getAll, getById, getByLogin, removeById, updateById };