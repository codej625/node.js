import { Controller, Post, UseGuards, Req, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async findAllUsers() {
    return '';
  }

  @Get('/:id')
  async findUser(@Param() param: string) {
    return '';
  }
}
