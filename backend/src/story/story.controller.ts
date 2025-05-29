import {
  Controller,
  Post,
  Get,
  Query,
  BadRequestException,
  Headers,
  Body,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { getLanguageFromHeader } from '../common/utils/language.utils';
import { StoryAgeGroup, StoryGenre } from './types/story.types';
import { Story } from '@prisma/client';

@Controller('stories')
export class StoryController {
  constructor(private readonly storiesService: StoryService) {}

  @Post('/generate')
  generateStorygenerateStory(
    @Query('ageGroup') ageGroup: StoryAgeGroup,
    @Query('genre') genre?: StoryGenre,
  ) {
    return this.storiesService.generateAndSaveStory(ageGroup, genre);
  }

  @Get('/by-date')
  async getByDate(
    @Query('date') dateStr: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const date = new Date(dateStr);
    const language = getLanguageFromHeader(acceptLanguage);

    if (isNaN(date.getTime())) {
      throw new BadRequestException('Ungültiges Datum.');
    }

    try {
      return await this.storiesService.findStoryByDate(date, language);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/all')
  async getAllAvailable(@Headers('accept-language') acceptLanguage?: string) {
    try {
      const language = getLanguageFromHeader(acceptLanguage);

      return await this.storiesService.getAllAvailableStories(language);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/generate-image')
  async generateImage() {
    try {
      return await this.storiesService.generateImageForStory();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('search')
  async searchStories(
    @Body('query') query?: string,
    @Body('genre') genre?: string | string[],
    @Body('ageGroup') ageGroup?: string | string[],
    @Body('limit') limit = 20,
    @Body('cursor') cursor?: number,
    @Headers('accept-language') acceptLanguage?: string,
  ): Promise<any> {
    const language = getLanguageFromHeader(acceptLanguage);

    return this.storiesService.searchStories({
      query,
      genre: Array.isArray(genre) ? genre : genre ? [genre] : [],
      ageGroup: Array.isArray(ageGroup) ? ageGroup : ageGroup ? [ageGroup] : [],
      limit: Number(limit),
      cursor,
      language,
    });
  }
}
