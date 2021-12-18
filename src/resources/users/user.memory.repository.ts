import { IUser } from "./user.model.js";

import * as DB from '../../db/inMemoryDb.js'

const TABLE_NAME = 'Users';

const getAll = async (): Promise<IUser[]> => DB.getAllEntities(TABLE_NAME) as IUser[];

const getById = async (id: string): Promise<IUser> => DB.getEntity(TABLE_NAME, id) as IUser;

const add = async (entity: IUser): Promise<IUser> => DB.addEntity(TABLE_NAME, entity) as IUser;

const remove = async (id: string): Promise<boolean> => DB.deleteEntity(TABLE_NAME, id);

const update = async (id: string, entity: IUser): Promise<IUser> => DB.updateEntity(TABLE_NAME, id, entity) as IUser;

export { add, getAll, getById, remove, update };