import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IBoardColumn } from '../interfaces/boardColumn.interface';

@Entity({ name: 'column' })
class BoardColumnEntity implements IBoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

}

export default BoardColumnEntity;
