import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './modules/app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  const logger = new Logger('Bootstrap');

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
  logger.log(`Server is running at ${await app.getUrl()}`);
}
bootstrap();
