import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { StoriesService } from './stories.service';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  create(@Body('title') title: string, @Body('content') content: string) {
    return this.storiesService.create(title, content);
  }

  @Get()
  findAll() {
    return this.storiesService.findAll();
  }

  @Post('/test')
  createTest() {
    return this.storiesService.createTest();
  }

  @Get('/today')
  getToday() {
    return this.storiesService.getStoryForToday();
  }

  @Post('/generate')
  generateStory() {
    //return this.storiesService.generateAndSaveStory();
  }

  @Get('/by-date')
  async getByDate(@Query('date') dateStr: string) {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      throw new BadRequestException('Ungültiges Datum.');
    }

    try {
      return await this.storiesService.findStoryByDate(date);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/all')
  async getAllAvailable() {
    try {
      return await this.storiesService.getAllAvailableStories();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
