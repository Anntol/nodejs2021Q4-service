import pkg from 'typeorm';
import * as uuid from 'uuid';
import { IBoardColumn } from '../interfaces/boardColumn.interface.js';

const { Column, Entity, PrimaryGeneratedColumn } = pkg;

@Entity({ name: 'column' })
class BoardColumnEntity implements IBoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  constructor({
    id = uuid.v4(),
    title = 'My Board',
    order = 0
  } = {} as IBoardColumn) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column: IBoardColumn): { id: string; title: string; order: number; } {
    const { id, title, order } = column;
    return { id, title, order };
  }
}

export default BoardColumnEntity;
