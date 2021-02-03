import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer'

import * as fs from 'fs';
import * as path from 'path';
import * as admin from 'firebase-admin';

export const storage = diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

@Injectable()
export class Googleservice {

  async uploadFile(file) {
    try {
      const { originalname, mimetype } = file

      const filePath = path.join(__dirname, `../../../public/uploads/${originalname}`);

      const bucket = admin.storage().bucket();
      return await bucket.upload(filePath,
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
        .then(async (file: any) => {
          const { metadata } = file[0];
          fs.unlinkSync(filePath);

          const dowloadLink =
            await bucket.file(metadata.name)
              .getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
              })

          return {
            name: metadata.name,
            imageLink: dowloadLink[0]
          }
        }).catch(err => {

          fs.unlinkSync(filePath);
          return { err }
        })
    } catch (error) {

      return error
    }
  }

}

