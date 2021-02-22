import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import { MongoDBModule } from 'src/database/mongoDB.module';
import { ProductsProviders } from 'src/database/schema/products';

@Module({
  imports: [MongoDBModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ...ProductsProviders
  ],
})
export class ProductsModule { }
