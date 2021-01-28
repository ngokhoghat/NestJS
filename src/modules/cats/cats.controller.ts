import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import path from 'path';
import fs from 'fs';

import * as admin from 'firebase-admin';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly appService: CatsService) { }

  @Get()
  getHello(): any {
    return ''
  }

  @Post()
  create(): any {
    return this.appService.create({})
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    })
  }))
  async uploadFile(@UploadedFile() file) {
    const { originalname, mimetype } = file

    const filePath = path.join(__dirname, `../../../public/uploads/${originalname}`);

    const bucket = admin.storage().bucket();
    const fileUpload = await bucket.upload(filePath,
      {
        destination: originalname,
        gzip: true,
        contentType: mimetype,
        metadata: {
          metadata: {
            firebaseStorageDownloadTokens: 'asdasd124124a2342sdasd34124asda'
          }
        },
      })
      .then((file: any) => {
        const { metadata } = file[0];
        fs.unlinkSync(filePath);

        return metadata
      }).catch(err => {

        fs.unlinkSync(filePath);
        return { err }
      })

    return fileUpload
  }
}
