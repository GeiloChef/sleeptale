import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { StoryModule } from '../story/story.module';

@Module({
  imports: [StoryModule],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
