import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { IUserRepository } from 'src/interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  private readonly userSelect = {
    id: true,
    email: true,
    name: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  };

  private handlePrismaError(error: any): never {
    switch (error.code) {
      case 'P2002':
        const field = (error.meta?.target as string[])?.[0] || 'field';
        throw new ConflictException(`${field} already exists`);
      case 'P2025':
        throw new NotFoundException('Record not found');
      default:
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            `Database error: ${error.message}`,
          );
        }

        throw new InternalServerErrorException('Internal server error');
    }
  }

  async create(data: CreateUserDto & { password: string }): Promise<User> {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException(`Email already exists`);
    }

    try {
      return await this.prisma.user.create({
        data,
        select: this.userSelect,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({
        select: this.userSelect,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findOne(id: string): Promise<User | null> {
    if (!id) {
      throw new NotFoundException('User ID is required');
    }

    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id },
        select: this.userSelect,
      });

    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(
    id: string,
    data: Partial<CreateUserDto & { password: string }>,
  ): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        select: this.userSelect,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: { id },
        select: this.userSelect,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }
}
