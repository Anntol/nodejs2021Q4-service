import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';

interface IBoardColumnEntity {
  id: string;
  title: string;
  order: number;
}

@Entity({ name: 'columns' })
class BoardColumnEntity {
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
  } = {} as IBoardColumnEntity) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column: IBoardColumnEntity): { id: string; title: string; order: number; } {
    const { id, title, order } = column;
    return { id, title, order };
  }
}

export default BoardColumnEntity;
