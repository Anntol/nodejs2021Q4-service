import Board, { IBoard } from './board.model.js';
import * as boardsRepo from './board.memory.repository.js';
import * as tasksService from '../tasks/task.service.js';

const getAll = () => boardsRepo.getAll();

const getById = (id: string): Promise<IBoard> => boardsRepo.getById(id);

const add = (board: IBoard): Promise<IBoard>  => boardsRepo.add(new Board(board));

const remove = (id: string): void => {
    boardsRepo.remove(id);
    tasksService.removeByBoardId(id);
}    

const update = (id: string, board: IBoard): Promise<IBoard> => boardsRepo.update(id, new Board(board));

export { add, getAll, getById, remove, update };
