import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { ImagesModule } from './images/image.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    CatsModule,
    ProductsModule,
    ImagesModule
  ],
  controllers: [AppController],
})
export class AppModule { }
