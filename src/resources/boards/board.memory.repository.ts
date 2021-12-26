import { IBoard } from "./board.model.js";
import * as DB from '../../db/inMemoryDb.js';

const TABLE_NAME = 'Boards';

/**
 * Gets all Board entities.
 * @returns Promise of Array of all Board entities 
 */
const getAll = async (): Promise<IBoard[]> => DB.getAllEntities(TABLE_NAME) as IBoard[];

/**
  * Gets Board entity by Id
  * @param id - Board Id
  * @returns Promise of Board entity
  */
const getById = async (id: string): Promise<IBoard> => DB.getEntity(TABLE_NAME, id) as IBoard;

/**
  * Adds Board entity
  * @param entity - Board entity
  * @returns Promise of Board entity
  */
const add = async (entity: IBoard): Promise<IBoard> => DB.addEntity(TABLE_NAME, entity) as IBoard;

/**
  * Removes Board entity
  * @param id - Board Id
  * @returns Promise of boolean type
  */
const remove = async (id: string): Promise<boolean> => DB.deleteEntity(TABLE_NAME, id);

/**
  * Updates Board entity
  * @param id - Board Id
  * @param entity - Board entity
  * @returns Promise of Board entity
  */
const update = async (id: string, entity: IBoard): Promise<IBoard> => DB.updateEntity(TABLE_NAME, id, entity) as IBoard;
 
export { add, getAll, getById, remove, update };
