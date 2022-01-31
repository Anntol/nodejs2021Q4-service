import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import auth from 'fastify-auth';

import verifyToken from '../../auth/auth';
import Board from './board.model';
import { IBoard } from '../../interfaces/board.interface';
import * as boardsService from './board.service';

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

/**
 * Gets all Boards.
 * @param _ - Fastify request
 * @param reply - Fastify reply
 */
const getBoards = async (_:FastifyRequest, reply:FastifyReply) => {
  const boards = await boardsService.getAll();
  reply.code(StatusCodes.OK).send(boards.map(Board.toResponse));
};

/**
 * Gets the Board.
 * @param req - Fastify request with id parameter
 * @param reply - Fastify reply
 */
const getBoard = async (req:BoardRequestWithParams, reply:FastifyReply) => {
  const board = await boardsService.getById(req.params.id);
  reply.code(StatusCodes.OK).send(Board.toResponse(board));
};

/**
 * Adds the Board.
 * @param req - Fastify request, body contains board json.
 * @param reply - Fastify reply
 */
const postBoard = async (req:BoardRequestWithBody, reply:FastifyReply) => {
  const newBoard = await boardsService.add(req.body);
  reply.code(StatusCodes.CREATED).send(Board.toResponse(newBoard));
};

/**
 * Updates the Board.
 * @param req - Fastify request with id parameter, body contains board json.
 * @param reply - Fastify reply
 */
const putBoard = async (req:BoardRequestWithBodyAndParams, reply:FastifyReply) => {
  const board = await boardsService.update(req.params.id, req.body);
  reply.code(StatusCodes.OK).send(Board.toResponse(board));
};

/**
 * Deletes the Board.
 * @param req - Fastify request with id parameter
 * @param reply - Fastify reply
 */
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

const privateBoardRoutes = (fastify:FastifyInstance) => { 
  fastify.get('/', { preHandler: fastify.auth([verifyToken]), ...getBoardsOpts });
  fastify.get('/:id', { preHandler: fastify.auth([verifyToken]), ...getBoardOpts });
  fastify.post('/', { preHandler: fastify.auth([verifyToken]), ...postBoardOpts });
  fastify.put('/:id', { preHandler: fastify.auth([verifyToken]), ...putBoardOpts });
  fastify.delete('/:id', { preHandler: fastify.auth([verifyToken]), ...deleteBoardOpts });
}

/**
 * Board routes handler.
 * @param fastify - Fastify Instance
 * @param _ - Fastify Plugin Options
 * @param done - callback function
 */
function boardsRoutes(fastify:FastifyInstance, _:FastifyPluginOptions, done: (err?: FastifyError) => void): Promise<unknown> | void {
  fastify.register(auth).after(() => privateBoardRoutes(fastify));
  done();
}

export default boardsRoutes;
