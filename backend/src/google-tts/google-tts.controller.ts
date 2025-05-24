// src/google-tts/google-tts.controller.ts
import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { GoogleTtsService } from './google-tts.service';

@Controller('tts')
export class GoogleTtsController {
  constructor(private readonly googleTtsService: GoogleTtsService) {}

  @Post('/test')
  async synthesize(@Body() body: { text: string; lang?: string }) {
    const { text } = body;
    const filePath = await this.googleTtsService.generateTextToSpeechTest(text);
    return { filePath };
  }

  @Post(':language/:storyId/:sectionId')
  async synthesizeFromStorySection(
    @Param('storyId') storyId: string,
    @Param('sectionId') sectionId: string,
    @Param('language') languageCode: string,
  ): Promise<{ url: string }> {
    const filePath = await this.googleTtsService.generateTextToSpeechForSection(
      storyId,
      sectionId,
      languageCode,
    );
    return { url: filePath };
  }
}
