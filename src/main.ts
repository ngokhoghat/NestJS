import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  await app.listen(3000);

  logger.log(`Server is running at ${await app.getUrl()}`);
}
bootstrap();
