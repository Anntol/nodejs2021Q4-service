import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';
import BoardColumnEntity from './column.entity.js';

export interface IBoardEntity {
  id: string;
  title: string;
  columns: BoardColumnEntity[];
}

@Entity({ name: 'boards' })
class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  columns: BoardColumnEntity[];

  constructor({
    id = uuid.v4(),
    title = 'My Board',
    columns = []
  } = {} as IBoardEntity) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoardEntity): { id: string; title: string; columns: BoardColumnEntity[]; } {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
export default BoardEntity;
