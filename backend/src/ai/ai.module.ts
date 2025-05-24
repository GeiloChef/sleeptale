import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [ImageModule],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
