import { getRepository } from 'typeorm';
import BoardEntity from '../../entities/board.entity';
import BoardColumnEntity from '../../entities/column.entity';
import NotFoundError from '../../errors/NotFoundError';
import { IBoard } from '../../interfaces/board.interface';

const getBoardRepository = () => getRepository(BoardEntity);

/**
 * Gets all Board entities.
 * @returns Promise of Array of all Board entities 
 */
const getAll = async (): Promise<IBoard[]> => getBoardRepository().find( { relations: ["columns"] });

/**
  * Gets Board entity by Id
  * @param id - Board Id
  * @returns Promise of Board entity
  */
const getById = async (id: string): Promise<IBoard> => {
  const board = await getBoardRepository().findOne(id, { relations: ["columns"] });
    if (!board) {
        throw new NotFoundError(`Entity ${id} was not found`);
    }
    return board;
};

/**
  * Adds Board entity
  * @param entity - Board entity
  * @returns Promise of Board entity
  */
const add = async (entity: IBoard): Promise<IBoard> => {
  const { columns } = entity;
  const newBoard = getBoardRepository().create(entity);
  if (columns) {
    const columnRepository = getRepository(BoardColumnEntity);
    const newColumns = columns.map((col) => columnRepository.create({...col}));
    newBoard.columns = await columnRepository.save(newColumns);
  }
  await getBoardRepository().save(newBoard);
  return getById(newBoard.id);
}

/**
  * Removes Board entity
  * @param id - Board Id
  * @returns Promise of boolean type
  */
const removeById = async (id: string): Promise<boolean> => {
  const item = await getById(id);
  if (!item) return false;

  getBoardRepository().delete(id);
  return true;
}

/**
  * Updates Board entity
  * @param id - Board Id
  * @param entity - Board entity
  * @returns Promise of Board entity
  */
const updateById = async (id: string, entity: IBoard): Promise<IBoard> => {
  let item = await getById(id);
  item = {...entity, id};
  return getBoardRepository().save(item);
}
 
export { add, getAll, getById, removeById, updateById };
