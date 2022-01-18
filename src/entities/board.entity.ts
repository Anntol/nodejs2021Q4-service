import pkg from 'typeorm';
import * as uuid from 'uuid';
import { IBoard } from '../interfaces/board.interface.js';
import { IBoardColumn } from '../interfaces/boardColumn.interface.js';

const { Column, Entity, PrimaryGeneratedColumn } = pkg;

@Entity({ name: 'board' })
class BoardEntity implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  columns: IBoardColumn[];

  constructor({
    id = uuid.v4(),
    title = 'My Board',
    columns = []
  } = {} as IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoard): { id: string; title: string; columns: IBoardColumn[]; } {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
export default BoardEntity;
