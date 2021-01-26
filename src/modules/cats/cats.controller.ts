/* eslint-disable @typescript-eslint/no-var-requires */
import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CatsService } from './cats.service';

const path = require('path');
const cwd = path.join(__dirname, '..');

import * as admin from 'firebase-admin';
@Controller('cats')
export class CatsController {
  constructor(private readonly appService: CatsService) { }

  @Get()
  getHello(): any {
    return this.appService.findAll();
  }

  @Post()
  create(): any {
    return this.appService.create({})
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    const bucket = admin.storage().bucket();
    

    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: path.join(cwd, 'hello.txt'),
    };
    console.log(options);

    // bucket.upload('public/assets/images/logo.jpg', {
    //   gzip: true,
    //   metadata: {
    //     cacheControl: 'public, max-age=31536000',
    //   },
    // })

    bucket.file('hello.txt').download(options).then((e) => {
      console.log('success', e);
    }).catch((err) => {
      console.log(err);
    });

    // const message = 'This is my message.';
    // storageRef.child('image').putString(message).then((snapshot) => {
    //   console.log('Uploaded a raw string!');
    // });
  }
}
