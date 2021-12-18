import * as uuid from 'uuid';
import Column from './column.model.js';

export interface IBoard {
  id: string;
  title: string;
  columns: Column[];
}

class Board {
  id: string;

  title: string;

  columns: Column[];

  constructor({
    id = uuid.v4(),
    title = 'My Board',
    columns = []
  } = {} as IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoard): { id: string; title: string; columns: Column[]; } {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
