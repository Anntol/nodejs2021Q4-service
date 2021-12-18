import { IBoard } from "./board.model.js";
import * as DB from '../../db/inMemoryDb.js';

const TABLE_NAME = 'Boards';

const getAll = async (): Promise<IBoard[]> => DB.getAllEntities(TABLE_NAME) as IBoard[];

const getById = async (id: string): Promise<IBoard> => DB.getEntity(TABLE_NAME, id) as IBoard;

const add = async (entity: IBoard): Promise<IBoard> => DB.addEntity(TABLE_NAME, entity) as IBoard;

const remove = async (id: string): Promise<boolean> => DB.deleteEntity(TABLE_NAME, id);

const update = async (id: string, entity: IBoard): Promise<IBoard> => DB.updateEntity(TABLE_NAME, id, entity) as IBoard;
 
export { add, getAll, getById, remove, update };
