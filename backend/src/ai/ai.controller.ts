// src/ai/ai.controller.ts
import { Controller, Post, Query } from '@nestjs/common';
import { AiService } from './ai.service';
import { StoryAgeGroup, StoryGenre } from '../story/types/story.types';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-story')
  async generateStory(
    @Query('ageGroup') ageGroup: StoryAgeGroup,
    @Query('genre') genre?: StoryGenre,
  ) {
    return this.aiService.generateStoryByAgeAndGenre(ageGroup, genre);
  }
}
