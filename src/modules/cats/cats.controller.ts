import { Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly appService: CatsService) { }

  @Get()
  getHello(): any {
    return this.appService.findAll();
  }

  @Post()
  create(): any {
    return this.appService.create({})
  }
}
