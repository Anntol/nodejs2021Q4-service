const { StatusCodes } = require('http-status-codes');
const Board = require('./board.model');
const boardsService = require('./board.service');

const getBoards = async (req, reply) => {
  const boards = await boardsService.getAll();
  reply.code(StatusCodes.OK).send(boards.map(Board.toResponse));
};

const getBoard = async (req, reply) => {
  const board = await boardsService.getById(req.params.id);
  reply.code(StatusCodes.OK).send(Board.toResponse(board));
};

const postBoard = async (req, reply) => {
  const newBoard = await boardsService.add(req.body);
  reply.code(StatusCodes.CREATED).send(Board.toResponse(newBoard));
};

const putBoard = async (req, reply) => {
  const board = await boardsService.update(req.params.id, req.body);
  reply.code(StatusCodes.OK).send(Board.toResponse(board));
};

const deleteBoard = async (req, reply) => {
  await boardsService.remove(req.params.id);
  reply.code(StatusCodes.NO_CONTENT);
};

const getBoardsOpts = {
  handler: getBoards,
};

const getBoardOpts = {
  handler: getBoard,
};

const postBoardOpts = {
  handler: postBoard,
};

const putBoardOpts = {
  handler: putBoard,
};

const deleteBoardOpts = {
  handler: deleteBoard,
};

function boardsRoutes(fastify, options, done) {
  fastify.get('/', getBoardsOpts);
  fastify.get('/:id', getBoardOpts);
  fastify.post('/', postBoardOpts);
  fastify.put('/:id', putBoardOpts);
  fastify.delete('/:id', deleteBoardOpts);

  done();
}

module.exports = boardsRoutes;
