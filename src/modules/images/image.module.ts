import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImagesService } from './image.service';

import { MongoDBModule } from 'src/database/mongoDB.module';
import { ImageProviders } from 'src/database/schema/images';
import { Googleservice } from 'src/services/googleSevices';

@Module({
  imports: [MongoDBModule],
  controllers: [ImageController],
  providers: [
    ImagesService,
    Googleservice,
    ...ImageProviders,
  ],
})
export class ImagesModule { }
