import { Module } from '@nestjs/common';
import { AccountController } from './accounts.controller';

import { AccountsService } from './accounts.service';
import { MongoDBModule } from 'src/database/mongoDB.module';
import { AccountProviders } from 'src/database/schema/accounts';

@Module({
  imports: [MongoDBModule],
  providers: [AccountsService, ...AccountProviders],
  controllers: [AccountController],
})
export class AccountModule { }
