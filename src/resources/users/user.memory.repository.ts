import { IUser } from "./user.model.js";

import * as DB from '../../db/inMemoryDb.js'

const TABLE_NAME = 'Users';

/**
 * Gets all User entities.
 * @returns Promise of Array of all User entities 
 */
const getAll = async (): Promise<IUser[]> => DB.getAllEntities(TABLE_NAME) as IUser[];

/**
 * Gets User entity by Id
 * @param id - User Id
 * @returns Promise of User entity
 */
const getById = async (id: string): Promise<IUser> => DB.getEntity(TABLE_NAME, id) as IUser;

/**
 * Adds User entity
 * @param entity - User entity
 * @returns Promise of User entity
 */
const add = async (entity: IUser): Promise<IUser> => DB.addEntity(TABLE_NAME, entity) as IUser;

/**
 * Removes User entity
 * @param id - User Id
 * @returns Promise of boolean type
 */
const remove = async (id: string): Promise<boolean> => DB.deleteEntity(TABLE_NAME, id);

/**
 * Updates User entity
 * @param id - User Id
 * @param entity - User entity
 * @returns Promise of User entity
 */
const update = async (id: string, entity: IUser): Promise<IUser> => DB.updateEntity(TABLE_NAME, id, entity) as IUser;

export { add, getAll, getById, remove, update };