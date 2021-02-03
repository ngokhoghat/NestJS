import { Module } from '@nestjs/common';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';

import { DatabaseModule } from 'src/database/database.module';
import { PostsProviders } from 'src/database/schema/posts';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    ...PostsProviders
  ],
})
export class PostsModule { }
