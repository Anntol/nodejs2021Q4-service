import * as uuid from 'uuid';
import Column from './column.model';

export interface IBoard {
  id: string;
  title: string;
  columns: Column[];
}

/**
 * {@link IBoard} 
 */
class Board implements IBoard {
  id: string;

  title: string;

  columns: Column[];

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
  static toResponse(board: IBoard): { id: string; title: string; columns: Column[]; } {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
