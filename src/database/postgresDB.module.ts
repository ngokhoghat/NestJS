import { Module } from '@nestjs/common';
import { postgreSqlProviders } from './providers/postgresDB.provider';

@Module({
  imports: [...postgreSqlProviders],
})
export class PostgresDBModule { }