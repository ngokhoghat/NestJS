import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly appService: CatsService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
