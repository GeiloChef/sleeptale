// src/google-tts/google-tts.controller.ts
import { Body, Controller, Headers, Param, Post, Query } from '@nestjs/common';
import { GoogleTtsService } from './google-tts.service';
import { getLanguageFromHeader } from '../common/utils/language.utils';

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
    @Headers('accept-language') acceptLanguage?: string,
  ): Promise<{ url: string }> {
    const language = getLanguageFromHeader(acceptLanguage);

    const filePath = await this.googleTtsService.generateTextToSpeechForSection(
      storyId,
      sectionId,
      language,
    );
    return { url: filePath };
  }
}
