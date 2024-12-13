import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from '../users/dtos/users.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: UsersDto) {
    return this.usersService.createUser(body);
  }

  @Get()
  async findAllUsers() {
    return this.usersService.findAllUsers();
  }
}
