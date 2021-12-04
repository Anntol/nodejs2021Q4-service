const DB = require('../../db/inMemoryDb');

const TABLE_NAME = 'Tasks';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const getById = async (id) => DB.getEntity(TABLE_NAME, id);

const add = async (entity) => DB.addEntity(TABLE_NAME, entity);

const remove = async (id) => DB.deleteEntity(TABLE_NAME, id);

const removeByBoardId = async (boardId) => DB.deleteTasksByBoardId(boardId);

const unassignUser = async (userId) => DB.unassignTasksUser(userId);

const update = async (id, entity) => DB.updateEntity(TABLE_NAME, id, entity);

module.exports = { add, getAll, getById, remove, removeByBoardId, unassignUser, update };
