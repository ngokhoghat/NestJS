import { Module } from '@nestjs/common';

import { MySqlProviders } from './providers/mysqlDB.provider';

@Module({
  imports: [...MySqlProviders],
})
export class MySqlDBModule { }