import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ITask } from '../interfaces/task.interface';
import UserEntity from './user.entity';
import BoardEntity from './board.entity';

@Entity({ name: 'task' })
class TaskEntity implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  userId: string | null = null;

  @ManyToOne(() => BoardEntity, (board) => board.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  boardId!: string;

  @Column('uuid', {nullable: true})
  columnId!: string;
  
}

export default TaskEntity;
