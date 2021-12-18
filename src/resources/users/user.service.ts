import User, { IUser } from './user.model.js';
import * as usersRepo from './user.memory.repository.js';
import * as tasksService from '../tasks/task.service.js';

const getAll = () => usersRepo.getAll();

const getById = (id: string): Promise<IUser> => usersRepo.getById(id);

const add = (user: IUser): Promise<IUser> => usersRepo.add(new User(user));

const remove = (id: string): void => {
    usersRepo.remove(id);
    tasksService.unassignUser(id);
}

const update = (id: string, user: IUser): Promise<IUser> => usersRepo.update(id, new User(user));

export { add, getAll, getById, remove, update };
