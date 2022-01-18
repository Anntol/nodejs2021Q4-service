import pkg from 'typeorm';
import * as uuid from 'uuid';
import { ITask } from '../interfaces/task.interface.js';

const { Column, Entity, PrimaryGeneratedColumn } = pkg;

@Entity({ name: 'task' })
class TaskEntity implements ITask {
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
  } = {} as ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId
  }

  static toResponse(task: ITask) {
    return task;
  }
}

export default TaskEntity;