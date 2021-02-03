import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImagesService } from './image.service';

import { DatabaseModule } from 'src/database/database.module';
import { ImageProviders } from 'src/database/schema/images';
import { Googleservice } from 'src/services/googleSevices';

@Module({
  imports: [DatabaseModule],
  controllers: [ImageController],
  providers: [
    ImagesService,
    ...ImageProviders,
    Googleservice
  ],
})
export class ImagesModule { }
