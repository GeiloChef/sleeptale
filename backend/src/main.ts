import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.use('/images', express.static(join(process.cwd(), 'storage', 'images')));
  app.use('/audio', express.static(join(process.cwd(), 'storage', 'audio')));

  await app.listen(4000, '0.0.0.0');
}
bootstrap();
