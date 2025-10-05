import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import type { IUserRepository } from 'src/interfaces/user.repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    };

    return this.userRepository.create(data);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    return this.userRepository.findOne(String(id));
  }

  async findByEmail(id: string) {
    return this.userRepository.findByEmail(String(id));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = { ...updateUserDto };

    if (data.password) {
      data.password = await this.hashPassword(data.password);
    }

    return this.userRepository.update(String(id), data);
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.userRepository.remove(String(id));
  }
}
