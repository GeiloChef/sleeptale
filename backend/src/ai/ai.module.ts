import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { ImageModule } from '../image/image.module';
import { AiController } from './ai.controller';
import { PrismaService } from '../prisma/prisma.service';
import { GenreService } from '../genre/genre.service';

@Module({
  imports: [ImageModule],
  providers: [AiService, PrismaService, GenreService],
  exports: [AiService],
  controllers: [AiController],
})
export class AiModule {}
