import * as uuid from 'uuid';

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

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

export default Task;
