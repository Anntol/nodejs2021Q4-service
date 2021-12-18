import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import Board, { IBoard } from './board.model.js';
import * as boardsService from './board.service.js';

interface IParams {
  id: string;
}

type BoardRequestWithBodyAndParams = FastifyRequest<{
  Body: IBoard,
  Params: IParams
}>

type BoardRequestWithBody = FastifyRequest<{
  Body: IBoard
}>

type BoardRequestWithParams = FastifyRequest<{
  Params: IParams
}>

const getBoards = async (_:FastifyRequest, reply:FastifyReply) => {
  const boards = await boardsService.getAll();
  reply.code(StatusCodes.OK).send(boards.map(Board.toResponse));
};

const getBoard = async (req:BoardRequestWithParams, reply:FastifyReply) => {
  const board = await boardsService.getById(req.params.id);
  reply.code(StatusCodes.OK).send(Board.toResponse(board));
};

const postBoard = async (req:BoardRequestWithBody, reply:FastifyReply) => {
  const newBoard = await boardsService.add(req.body);
  reply.code(StatusCodes.CREATED).send(Board.toResponse(newBoard));
};

const putBoard = async (req:BoardRequestWithBodyAndParams, reply:FastifyReply) => {
  const board = await boardsService.update(req.params.id, req.body);
  reply.code(StatusCodes.OK).send(Board.toResponse(board));
};

const deleteBoard = async (req:BoardRequestWithParams, reply:FastifyReply) => {
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

function boardsRoutes(fastify:FastifyInstance, _:FastifyPluginOptions, done: (_err?: FastifyError) => void): Promise<unknown> | void {
  fastify.get('/', getBoardsOpts);
  fastify.get('/:id', getBoardOpts);
  fastify.post('/', postBoardOpts);
  fastify.put('/:id', putBoardOpts);
  fastify.delete('/:id', deleteBoardOpts);

  done();
}

export default boardsRoutes;
