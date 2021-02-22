import { Module } from '@nestjs/common';
import { mongoDbProviders } from './providers/mongoDB.provider';

@Module({
  providers: [...mongoDbProviders],
  exports: [...mongoDbProviders],
})
export class MongoDBModule { }