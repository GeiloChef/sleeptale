import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AiService } from '../ai/ai.service';
import { ImageModule } from '../image/image.module';
import { TranslationService } from '../translation/translation.service';

@Module({
  imports: [PrismaModule, ImageModule],
  providers: [StoryService, AiService, TranslationService],
  controllers: [StoryController],
  exports: [StoryService],
})
export class StoryModule {}
