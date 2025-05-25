import { Module } from '@nestjs/common';
import { GoogleTtsService } from './google-tts.service';
import { GoogleTtsController } from './google-tts.controller';
import { StoryModule } from '../story/story.module';

@Module({
  imports: [StoryModule],
  providers: [GoogleTtsService],
  controllers: [GoogleTtsController],
})
export class GoogleTtsModule {}
