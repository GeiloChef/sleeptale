import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoriesModule } from './stories/stories.module';
import { PrismaModule } from './prisma/prisma.module';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';
import { ImageService } from './image/image.service';
import { ImageModule } from './image/image.module';
import { GoogleTtsService } from './google-tts/google-tts.service';
import { GoogleTtsController } from './google-tts/google-tts.controller';
import { GoogleTtsModule } from './google-tts/google-tts.module';
import { StoriesService } from './stories/stories.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}` || '.env',
    }),
    PrismaModule,
    StoriesModule,
    AiModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ImageModule,
    GoogleTtsModule,
  ],
  controllers: [AppController, GoogleTtsController],
  providers: [AppService, ImageService, GoogleTtsService, StoriesService],
})
export class AppModule {}
