// src/google-tts/google-tts.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as textToSpeech from '@google-cloud/text-to-speech';
import * as fs from 'fs';
import * as util from 'util';
import { join } from 'path';
import { StoryService } from '../story/story.service';

export interface GoogleTtsVoiceSettings {
  languageCode: string;
  voiceName: string;
}

const LANGUAGE_SETTINGS: Record<string, GoogleTtsVoiceSettings> = {
  en: {
    languageCode: 'en-US',
    voiceName: 'en-US-Wavenet-D',
  },
  de: {
    languageCode: 'de-DE',
    voiceName: 'de-DE-Wavenet-B',
  },
  es: {
    languageCode: 'es-ES',
    voiceName: 'es-ES-Chirp3-HD-Umbriel',
  },
};

@Injectable()
export class GoogleTtsService {
  private client: textToSpeech.TextToSpeechClient;
  private logger = new Logger(GoogleTtsService.name);

  constructor(private readonly storiesService: StoryService) {
    this.client = new textToSpeech.TextToSpeechClient({
      keyFilename: join(process.cwd(), 'src', 'config', 'google-tts-key.json'),
    });
  }
  async generateTextToSpeechTest(
    text: string,
    languageCode = 'en',
  ): Promise<string> {
    const settings: GoogleTtsVoiceSettings = LANGUAGE_SETTINGS[languageCode];

    if (!settings)
      throw new Error(`Unsupported language code: ${languageCode}`);

    const request: textToSpeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
      {
        input: { text },
        voice: {
          languageCode: settings.languageCode,
          name: settings.voiceName,
        },
        audioConfig: { audioEncoding: 'MP3' },
      };

    const [response] = await this.client.synthesizeSpeech(request);

    if (!response.audioContent) {
      throw new Error('No audio content received from Google TTS');
    }

    const outputPath = join(
      process.cwd(),
      'storage',
      'audio',
      `${Date.now()}.mp3`,
    );
    await util.promisify(fs.writeFile)(
      outputPath,
      response.audioContent,
      'binary',
    );
    this.logger.log(`Audio content written to file: ${outputPath}`);

    return outputPath;
  }

  async generateTextToSpeechForSection(
    storyId: string | number,
    sectionId: string | number,
    languageCode = 'en',
  ): Promise<string> {
    const sectionText = await this.storiesService.findSectionTextById(
      storyId,
      sectionId,
    );

    const settings: GoogleTtsVoiceSettings = LANGUAGE_SETTINGS[languageCode];

    if (!settings)
      throw new Error(`Unsupported language code: ${languageCode}`);

    const request: textToSpeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
      {
        input: { text: sectionText },
        voice: {
          languageCode: settings.languageCode,
          name: settings.voiceName,
        },
        audioConfig: { audioEncoding: 'MP3' },
      };

    const [response] = await this.client.synthesizeSpeech(request);

    if (!response.audioContent) {
      throw new Error('No audio content received from Google TTS');
    }

    const fileName = `${storyId}_${sectionId}_${languageCode}`;

    const outputPath = join(
      process.cwd(),
      'storage',
      'audio',
      `${fileName}.mp3`,
    );
    await util.promisify(fs.writeFile)(
      outputPath,
      response.audioContent,
      'binary',
    );
    this.logger.log(`Audio content written to file: ${outputPath}`);

    return `${fileName}.mp3`;
  }
}
