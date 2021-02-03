import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { ImagesModule } from './images/image.module';
import { PostsModule } from './posts/post.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    CatsModule,
    PostsModule,
    ImagesModule,
    ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
