import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';

export interface IUserEntity {
  id: string;
  name: string;
  login: string;
  password: string;
}

@Entity({ name: 'users' })
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {} as IUserEntity) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUserEntity) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default UserEntity;
