import * as uuid from 'uuid';

interface IColumn {
  id: string;
  title: string;
  order: number;
}

class Column {
  id: string;

  title: string;

  order: number;

  constructor({
    id = uuid.v4(),
    title = 'My Board',
    order = 0
  } = {} as IColumn) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column: IColumn): { id: string; title: string; order: number; } {
    const { id, title, order } = column;
    return { id, title, order };
  }
}

export default Column;
