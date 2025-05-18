import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import * as process from 'process';
import { ImageService } from '../image/image.service';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private readonly imageService: ImageService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateStory(): Promise<{
    title: string;
    sections: string[];
    description: string;
  }> {
    const prompt = `Erstelle eine kinderfreundliche Geschichte. Dir ist überlassen worum es geht und wie sie aufgebaut ist.
    Es sollte sich als gute Nacht Geschichte eignen.
    Die Geschichte soll aus 6–10 kurzen Abschnitten bestehen, jeder Abschnitt ca. 4-6 Sätze. Antworte als JSON im folgenden Format:

    {
      "title": "Der Titel",
      "description": "A small teasing introduction",
      "sections": [
        "Abschnitt 1",
        "Abschnitt 2",
        ...
      ]
    }`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = completion.choices[0].message.content;

    try {
      return JSON.parse(content || '');
    } catch (err) {
      throw new Error('Antwort konnte nicht gelesen werden.');
    }
  }

  async generateCoverImageForStory(title: string): Promise<string> {
    const prompt = `Ein kindgerechtes, beruhigendes Bild für die Gute-Nacht-Geschichte "${title}". 
    Füge keinesfalls Text in das Bild ein. Nutze angenehme Farben und halte das Bild Kinderfreundlich.`;

    const imageResponse = await this.openai.images.generate({
      prompt,
      model: 'dall-e-3',
      n: 1,
      size: '1024x1024',
    });

    const imageUrl = imageResponse.data[0]?.url;

    console.log(imageUrl);
    if (!imageUrl) throw new Error('Kein Bild-URL von OpenAI erhalten');

    const localImagePath =
      await this.imageService.downloadImageFromUrl(imageUrl);

    return localImagePath;
  }
}
