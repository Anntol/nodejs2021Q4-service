import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IBoard } from '../interfaces/board.interface';
import BoardColumnEntity from './column.entity';

@Entity({ name: 'board' })
class BoardEntity implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => BoardColumnEntity, (column) => column.boardId, { eager: true })
  columns!: BoardColumnEntity[];
}

export default BoardEntity;
