// image.service.ts
import { Injectable } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import fetch from 'node-fetch';
import { join } from 'path';
import { existsSync } from 'fs';
import { randomUUID } from 'crypto';
import { OpenAI } from 'openai'; // falls du OpenAI SDK nutzt

@Injectable()
export class ImageService {
  private readonly imageFolder = join(
    __dirname,
    '..',
    '..',
    'public',
    'images',
  );
  private readonly openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  constructor() {
    this.ensureDirectoryExists();
  }

  private async ensureDirectoryExists() {
    if (!existsSync(this.imageFolder)) {
      await mkdir(this.imageFolder, { recursive: true });
    }
  }

  async downloadImageFromUrl(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Bild konnte nicht geladen werden: ${response.statusText}`,
      );
    }

    const buffer = await response.buffer();

    const filename = `story-${randomUUID()}.png`;
    const filePath = join(this.imageFolder, filename);

    await writeFile(filePath, buffer);

    return `/images/${filename}`;
  }
}
