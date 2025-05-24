import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use('/images', express.static(join(__dirname, '..', 'public', 'images')));
  app.use('/audio', express.static(join(__dirname, '..', 'public', 'audio')));

  await app.listen(4000, '0.0.0.0');
}
bootstrap();
