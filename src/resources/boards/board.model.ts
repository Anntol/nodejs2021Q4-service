import * as uuid from 'uuid';
import { IBoard } from '../../interfaces/board.interface';
import { IBoardColumn } from '../../interfaces/boardColumn.interface';

/**
 * {@link IBoard} 
 */
class Board implements IBoard {
  id: string;

  title: string;

  columns: IBoardColumn[];

  /**
   * Board constructor
   * @param Board - Board
   */
  constructor({
    id = uuid.v4(),
    title = 'My Board',
    columns = []
  } = {} as IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Remove unwanted fields from Board response
   * @param board - Board
   * @returns Board object without unwanted fields
   */
  static toResponse(board: IBoard) {
    return board;
  }
}

export default Board;
