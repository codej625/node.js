import { HttpStatus, HttpCode, Controller, Param, Req, Res, Body, Get, Post, Put, Patch, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';

@Controller('/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('/')
  @HttpCode(201) // 기본 상태값 설정
  createCat(@Body() body: object, @Res() res: Response): void {
    return;
  }

  @Get('/')
  findAllCats(@Req() req: Request, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({ message: '' });
  }

  @Get(':id')
  findOneCat(@Param('id') id: string, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({ message: '' });
  }

  @Put(':id')
  updateCat(@Body() body: object, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({ message: '' });
  }

  @Patch(':id')
  patchCat(@Body() body: object, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({ message: '' });
  }

  @Delete(':id')
  deleteCat(@Body() body: object, @Res() res: Response): void {
    res.status(HttpStatus.OK).json({ message: '' });
  }
}
