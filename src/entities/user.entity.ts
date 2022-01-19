import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/user.interface';

@Entity({ name: 'user' })
class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

}

export default UserEntity;
