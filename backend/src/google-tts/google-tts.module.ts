import { Module } from '@nestjs/common';
import { GoogleTtsService } from './google-tts.service';
import { GoogleTtsController } from './google-tts.controller';
import { StoriesModule } from '../stories/stories.module';

@Module({
  imports: [StoriesModule],
  providers: [GoogleTtsService],
  controllers: [GoogleTtsController],
})
export class GoogleTtsModule {}
