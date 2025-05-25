import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { getLanguageFromHeader } from '../common/utils/language.utils';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Get()
  findAll() {
    return this.storiesService.findAll();
  }

  @Post('/generate')
  generateStory() {
    return this.storiesService.generateAndSaveStory();
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

      return await this.storiesService.getAllAvailableStories();
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
}
