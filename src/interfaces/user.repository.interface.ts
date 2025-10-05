import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from './user.interface';

export interface IUserRepository {
  create(data: CreateUserDto & { password: string }): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  update(id: string, data: Partial<CreateUserDto & { password: string }>): Promise<User>;
  remove(id: string): Promise<User>;
}