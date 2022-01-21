import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IBoardColumn } from '../interfaces/boardColumn.interface';
import BoardEntity from './board.entity';

@Entity({ name: 'column', orderBy: { order: "ASC" } })
class BoardColumnEntity implements IBoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => BoardEntity, (board) => board.columns, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn({ name: "boardId" })
  boardId!: BoardEntity;
}

export default BoardColumnEntity;
