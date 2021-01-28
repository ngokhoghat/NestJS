import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    CatsModule,
    ProductsModule
  ],
  controllers: [AppController],
})
export class AppModule { }
