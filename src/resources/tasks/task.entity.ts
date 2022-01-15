import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';

export interface ITaskEntity {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

@Entity({ name: 'tasks' })
class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column()
  userId: string | null;

  @Column()
  boardId: string | null;

  @Column()
  columnId: string | null;

  constructor({
    id = uuid.v4(),
    title = 'My Task',
    order = 0,
    description = 'Task description',
    userId = null,
    boardId = null,
    columnId = null
  } = {} as ITaskEntity) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId
  }

  static toResponse(task: ITaskEntity) {
    return task;
  }
}

export default TaskEntity;
