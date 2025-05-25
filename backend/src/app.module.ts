import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoryModule } from './story/story.module';
import { PrismaModule } from './prisma/prisma.module';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';
import { ImageService } from './image/image.service';
import { ImageModule } from './image/image.module';
import { GoogleTtsService } from './google-tts/google-tts.service';
import { GoogleTtsController } from './google-tts/google-tts.controller';
import { GoogleTtsModule } from './google-tts/google-tts.module';
import { StoryService } from './story/story.service';
import { TranslationModule } from './translation/translation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}` || '.env',
    }),
    PrismaModule,
    StoryModule,
    AiModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ImageModule,
    GoogleTtsModule,
    TranslationModule,
  ],
  controllers: [AppController, GoogleTtsController],
  providers: [AppService, ImageService, GoogleTtsService, StoryService],
})
export class AppModule {}
