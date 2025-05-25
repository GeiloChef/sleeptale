import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AiService } from '../ai/ai.service';
import { ImageModule } from '../image/image.module';
import { TranslationService } from '../translation/translation.service';

@Module({
  imports: [PrismaModule, ImageModule],
  providers: [StoriesService, AiService, TranslationService],
  controllers: [StoriesController],
  exports: [StoriesService],
})
export class StoriesModule {}
