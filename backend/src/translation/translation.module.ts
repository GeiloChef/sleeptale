import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { StoriesModule } from '../stories/stories.module';

@Module({
  imports: [StoriesModule],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
