import * as uuid from 'uuid';
import { IUser } from '../../interfaces/user.interface';

/**
 * {@link IUser} 
 */
class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * User constructor
   * @param user - User
   */
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

  /**
   * Remove unwanted fields from User response
   * @param user - User
   * @returns User object without unwanted fields
   */
  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
