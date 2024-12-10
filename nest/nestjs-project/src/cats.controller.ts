import { HttpStatus, Controller, Param, Query, Req, Res, Body, Get, Post, Put, Patch, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';

@Controller('/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  createCat(@Body() body: Body, @Res() res: Response): void {
    res.status(HttpStatus.CREATED).send();
  }

  @Get('/')
  findAllCats(@Req() req: Request, @Res() res: Response): void {
    res.status(HttpStatus.OK).send();
  }

  @Get(':id')
  findOneCat(@Param() param: Request, @Res() res: Response): void {
    res.status(HttpStatus.OK).send();
  }

  @Get('/search')
  findByCat(@Query() query: string | number, @Res() res: Response): void {
    res.status(HttpStatus.OK).send();
  }

  @Put(':id')
  updateCat(@Body() body: Body, @Res() res: Response): void {
    res.status(HttpStatus.OK).json([]);
  }

  @Patch(':id')
  patchCat(@Body() body: Body, @Res() res: Response): void {
    res.status(HttpStatus.OK).json([]);
  }

  @Delete(':id')
  deleteCat(@Body() body: Body, @Res() res: Response): void {
    res.status(HttpStatus.OK).json([]);
  }
}
