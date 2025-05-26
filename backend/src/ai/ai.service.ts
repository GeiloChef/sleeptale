import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OpenAI } from 'openai';
import * as process from 'process';
import { ImageService } from '../image/image.service';
import {
  STORY_GENRES,
  StoryAgeGroup,
  StoryGenre,
} from '../story/types/story.types';
import { PrismaService } from '../prisma/prisma.service';
import { AGE_GROUP_PROMPTS, GeneratedStoryContent } from './types/ai.types';
import { GenreService } from '../genre/genre.service';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(
    private readonly imageService: ImageService,
    private readonly genreService: GenreService,
    private readonly prisma: PrismaService,
  ) {
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

  buildStoryPrompt(ageGroup: string, genre: StoryGenre): string {
    const ageBasedPrompt =
      AGE_GROUP_PROMPTS[ageGroup] ?? 'Erstelle eine Kurzgeschichte.';
    const genreBasedPrompt = genre.promptModifier;

    return `${ageBasedPrompt}
    ${genreBasedPrompt}
    
        Die Geschichte soll aus 10-14 kurzen Abschnitten bestehen, jeder Abschnitt mindestens 5 Sätze.
        
        Antworte als JSON im folgenden Format:
        {
          "title": "Der Titel",
          "description": "Eine kleine Einleitung zur Geschichte",
          "sections": [
            "Abschnitt 1",
            "Abschnitt 2",
            ...
          ],
        }`;
  }

  async generateStoryByAgeAndGenre(
    ageGroup: StoryAgeGroup,
    genre?: StoryGenre,
  ): Promise<GeneratedStoryContent> {
    if (!genre) {
      genre = await this.genreService.getRandomGenreForAgeGroup(ageGroup);
    }

    console.log(ageGroup);

    if (!genre || !genre.ageGroups.includes(ageGroup)) {
      throw new BadRequestException(
        'Invalid or unsupported genre for this age group',
      );
    }

    const prompt = this.buildStoryPrompt(ageGroup, genre);

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = JSON.parse(completion.choices[0].message.content);

    const storyContent: GeneratedStoryContent = {
      ...content,
      ageGroup: ageGroup,
      genre: genre,
    };

    try {
      return storyContent;
    } catch (err) {
      throw new Error('Antwort konnte nicht gelesen werden.');
    }
  }

  async createNewStory(ageGroup: StoryAgeGroup, genre?: StoryGenre) {}

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

    if (!imageUrl) throw new Error('Kein Bild-URL von OpenAI erhalten');

    const localImagePath =
      await this.imageService.downloadImageFromUrl(imageUrl);

    return localImagePath;
  }
}
