import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UsersDto } from './dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(@Body() usersDto: UsersDto) {
    return this.prisma.users.create({
      data: {
        name: usersDto.name,
        email: usersDto.email,
      },
    });
  }

  async findAllUsers() {
    return this.prisma.users.findMany();
  }
}
