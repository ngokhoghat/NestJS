import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import { DatabaseModule } from 'src/database/database.module';
import { ProductsProviders } from 'src/database/schema/products';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ...ProductsProviders
  ],
})
export class ProductsModule { }
