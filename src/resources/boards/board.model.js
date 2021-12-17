const uuid = require('uuid');
const Column = require('./column.model');

class Board {
  constructor({
    id = uuid.v4(),
    title = 'My Board',
    columns = [
      new Column("To Do", 0),
      new Column("In Progress", 1),
      new Column("Done", 2)
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
