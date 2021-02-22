import { Module } from '@nestjs/common';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';

import { MongoDBModule } from 'src/database/mongoDB.module';
import { PostsProviders } from 'src/database/schema/posts';

@Module({
  imports: [MongoDBModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    ...PostsProviders
  ],
})
export class PostsModule { }
