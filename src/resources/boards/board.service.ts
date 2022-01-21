import Board from './board.model';
import { IBoard } from '../../interfaces/board.interface';
import * as boardsRepo from './board.pg.repository';

/**
 * Gets all Board entities.
 * @returns Promise of Array of all Board entities 
 */
const getAll = () => boardsRepo.getAll();

/**
  * Gets Board entity by Id
  * @param id - Board Id
  * @returns Promise of Board entity
  */
const getById = (id: string): Promise<IBoard> => boardsRepo.getById(id);

/**
  * Adds Board entity
  * @param entity - Board entity
  * @returns Promise of Board entity
  */
const add = (board: IBoard): Promise<IBoard>  => boardsRepo.add(new Board(board));

/**
  * Removes Board entity
  * @param id - Board Id
  * @returns Promise of boolean type
  */
const remove = (id: string): void => {
    boardsRepo.removeById(id);
}    

/**
  * Updates Board entity
  * @param id - Board Id
  * @param entity - Board entity
  * @returns Promise of Board entity
  */
const update = (id: string, board: IBoard): Promise<IBoard> => boardsRepo.updateById(id, new Board(board));

export { add, getAll, getById, remove, update };
