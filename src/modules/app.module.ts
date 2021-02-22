import { Module } from '@nestjs/common';
import { PostgresDBModule } from 'src/database/postgresDB.module';
import { AppController } from './app.controller';

// modules
import { PostsModule } from './posts/post.module';
import { ImagesModule } from './images/image.module';
import { AccountModule } from './accounts/accounts.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    PostsModule,
    ImagesModule,
    AccountModule,
    ProductsModule,

    PostgresDBModule, // PostgresDB
  ],
  controllers: [AppController],
})
export class AppModule { }
