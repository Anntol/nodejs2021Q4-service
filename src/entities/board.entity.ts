// import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IBoard } from '../interfaces/board.interface';
import BoardColumnEntity from './column.entity';

@Entity({ name: 'board' })
class BoardEntity implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => BoardColumnEntity, column => column.id)
  columns!: BoardColumnEntity[];

}
export default BoardEntity;
