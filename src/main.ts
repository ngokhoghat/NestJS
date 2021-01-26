import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { AppModule } from './modules/app.module';
import { join } from 'path';
import { initConfig } from './config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('./config/coffee-house-3eb7f-firebase-adminsdk-emt3h-ae0c49db37.json');

async function bootstrap() {
  await initConfig() // init app config
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "coffee-house-3eb7f.appspot.com",
  }); // init firebase storage

  const app = await NestFactory.create<NestApplication>(AppModule);


  const logger = new Logger('Bootstrap');

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');
  app.enableCors();

  await app.listen(3000);
  logger.log(`Server is running at ${await app.getUrl()}`);
}
bootstrap();
