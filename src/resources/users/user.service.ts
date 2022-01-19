import User, { IUser } from './user.model';
import * as usersRepo from './user.pg.repository';
// import * as tasksService from '../tasks/task.service.js';

/**
 * Gets all User entities.
 * @returns Promise of Array of all User entities 
 */
const getAll = () => usersRepo.getAll();

/**
 * Gets User entity by Id
 * @param id - User Id
 * @returns Promise of User entity
 */
const getById = (id: string): Promise<IUser> => usersRepo.getById(id);

/**
 * Adds User entity
 * @param entity - User entity
 * @returns Promise of User entity
 */
const add = (user: IUser): Promise<IUser> => usersRepo.add(new User(user));

/**
 * Removes User entity
 * @param id - User Id
 * @returns Promise of boolean type
 */
const remove = (id: string): void => {
    usersRepo.removeById(id);
    // tasksService.unassignUser(id);
}

/**
 * Updates User entity
 * @param id - User Id
 * @param entity - User entity
 * @returns Promise of User entity
 */
const update = (id: string, user: IUser): Promise<IUser> => usersRepo.updateById(id, new User(user));

export { add, getAll, getById, remove, update };
