import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'

import * as admin from 'firebase-admin';
import { CatsService } from './cats.service';


const path = require('path');
const fs = require('fs');
@Controller('cats')
export class CatsController {
  constructor(private readonly appService: CatsService) { }

  @Get()
  getHello(): any {

  }

  @Post()
  create(): any {
    return this.appService.create({})
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/uploads'
      , filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
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
