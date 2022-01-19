import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IBoard } from '../interfaces/board.interface';
import { IBoardColumn } from '../interfaces/boardColumn.interface';

@Entity({ name: 'board' })
class BoardEntity implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  columns: IBoardColumn[];

  constructor({
    id = uuidv4(),
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
