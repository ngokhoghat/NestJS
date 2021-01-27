import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

import * as serviceAccount  from './config/coffee-house-3eb7f-firebase-adminsdk-emt3h-677d69511f.json'

import { AppModule } from './modules/app.module';
import { join } from 'path';
import { initConfig } from './config';


async function bootstrap() {
  await initConfig() // init app config
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
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
