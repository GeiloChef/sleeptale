import {
  Controller,
  Post,
  Get,
  Query,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { getLanguageFromHeader } from '../common/utils/language.utils';

@Controller('stories')
export class StoryController {
  constructor(private readonly storiesService: StoryService) {}

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
}
