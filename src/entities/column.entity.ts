import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IBoard } from '../interfaces/board.interface';
import { IBoardColumn } from '../interfaces/boardColumn.interface';
// import BoardEntity from './board.entity';

@Entity({ name: 'column' })
class BoardColumnEntity implements IBoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  // @ManyToOne(() => BoardEntity, board => board.columns, {onDelete: 'CASCADE'})
  @ManyToOne('BoardEntity', 'columns', {onDelete: 'CASCADE'}) 
  board!: IBoard;
}

export default BoardColumnEntity;
