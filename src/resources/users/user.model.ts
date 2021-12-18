import * as uuid from 'uuid';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {} as IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
