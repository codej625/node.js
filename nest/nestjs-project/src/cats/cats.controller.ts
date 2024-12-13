import {
  HttpStatus,
  HttpException,
  HttpCode,
  Controller,
  Param,
  Req,
  Res,
  Body,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';

@Controller('/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('/')
  @HttpCode(201) // 기본 상태값 설정
  createCat(@Body() body: Record<string, any>, @Res() res: Response): void {
    res.json({ message: '' });
  }

  @Get('/')
  @HttpCode(200)
  findAllCats(@Req() req: Request, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({ message: process.env.DATABASE_USER });
  }

  @Get(':id')
  @HttpCode(200)
  findOneCat(@Param('id', ParseIntPipe) id: number, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({ message: '' });
  }

  @Put(':id')
  updateCat(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, any>, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({ message: '' });
  }

  @Patch(':id')
  patchCat(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, any>, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({ message: '' });
  }

  @Delete(':id')
  deleteCat(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, any>, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({ message: '' });
  }
}
