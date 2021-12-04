const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const add = (user) => usersRepo.add(new User(user));

const remove = (id) => {
    usersRepo.remove(id);
    // tasksService.unassignUser(id);
}

const update = (id, user) => usersRepo.update(id, new User(user));

module.exports = { add, getAll, getById, remove, update };
