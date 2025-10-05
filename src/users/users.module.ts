import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from '../repositories/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, 
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  // exports: [UsersService], // Uncomment if other modules need to use the UsersService
})
export class UsersModule {}
