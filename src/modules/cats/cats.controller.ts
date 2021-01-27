import { Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';

import * as admin from 'firebase-admin';

@Controller('cats')
export class CatsController {
  constructor(private readonly appService: CatsService) { }

  @Get()
  getHello(): any {
    const bucket = admin.storage().bucket();
    bucket.upload('./public/assets/images/coffee-house-bg.jpeg',
    {
      destination: `Image/coffee-house-bg.jpeg`,
      gzip: true, 
      contentType: "image/jpeg", 
      metadata: {
        metadata: {
            firebaseStorageDownloadTokens: 'asdasd124124a2342sdasd34124asda'
        }
    },
    })
      .then((file: any) => {
        console.log(file);

      }).catch(err => {
        console.log(err);
      })
    return ''
  }

  @Post()
  create(): any {
    return this.appService.create({})
  }
}
