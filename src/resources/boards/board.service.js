const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);

const add = (board) => boardsRepo.add(new Board(board));

const remove = (id) => {
    boardsRepo.remove(id);
    // tasksService.removeByBoardId(id);
}    

const update = (id, board) => boardsRepo.update(id, new Board(board));

module.exports = { add, getAll, getById, remove, update };
