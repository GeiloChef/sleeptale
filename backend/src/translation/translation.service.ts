import { Injectable, Logger } from '@nestjs/common';
import * as deepl from 'deepl-node';
import { SourceLanguageCode, TargetLanguageCode } from 'deepl-node';

@Injectable()
export class TranslationService {
  private translator: deepl.Translator;
  private readonly logger = new Logger(TranslationService.name);

  constructor() {
    this.translator = new deepl.Translator(process.env.DEEPL_API_KEY!);
  }

  getLanguageName(language: string) {
    switch (language) {
      case 'en':
        return 'en-US';
      default:
        return language;
    }
  }

  async translateText(
    text: string,
    from: SourceLanguageCode,
    to: TargetLanguageCode,
  ): Promise<string> {
    try {
      const fromLanguageDeepl = this.getLanguageName(
        from,
      ) as SourceLanguageCode;
      const toLanguageDeepl = this.getLanguageName(to) as TargetLanguageCode;

      const result = await this.translator.translateText(
        text,
        fromLanguageDeepl,
        toLanguageDeepl,
      );
      return result.text;
    } catch (err) {
      this.logger.error('Translation failed:', err);
      throw err;
    }
  }
}
