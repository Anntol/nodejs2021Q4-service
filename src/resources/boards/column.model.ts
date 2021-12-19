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

  /**
   * Column constructor
   * @param column - Column
   */
  constructor({
    id = uuid.v4(),
    title = 'My Board',
    order = 0
  } = {} as IColumn) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /**
   * Remove unwanted fields from Column response
   * @param column - Column
   * @returns Column object without unwanted fields
   */
  static toResponse(column: IColumn): { id: string; title: string; order: number; } {
    const { id, title, order } = column;
    return { id, title, order };
  }
}

export default Column;
