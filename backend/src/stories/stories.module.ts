import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AiService } from '../ai/ai.service';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [PrismaModule, ImageModule],
  providers: [StoriesService, AiService],
  controllers: [StoriesController],
})
export class StoriesModule {}
