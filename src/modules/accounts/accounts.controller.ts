import { Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountsService) { }

  @Get()
  getAll(): any {
    return this.accountService.getAll();
  }
}
