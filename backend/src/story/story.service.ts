// src/story/story.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { formatDate } from '../common/utils/date.utils';
import {
  storyWithoutSectionsDtoMaker,
  storyWithSectionsDtoMaker,
} from './dto/story.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class StoryService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
    private translationService: TranslationService,
  ) {}

  async findAll() {
    return this.prisma.story.findMany();
  }

  async assignScheduledDate(storyId: number, date: string) {
    return this.prisma.story.update({
      where: { id: storyId },
      data: { scheduledAt: date },
    });
  }

  async prepareStoryForFrontend(story, language) {
    const translatedStory = await this.translateStory(story, language);

    return storyWithSectionsDtoMaker(translatedStory, language);
  }

  async translateStory(story, language, generateSections = true) {
    const fallbackLanguage = 'de';

    const originalStoryDetails = story.details.find(
      (t) => t.language === fallbackLanguage,
    );

    const translatedStoryDetails = story.details.find(
      (t) => t.language === language,
    );

    let originalStorySections = [];
    let translatedStorySections = [];

    if (generateSections) {
      originalStorySections = story.sections.filter(
        (s) => s.language === fallbackLanguage,
      );
      translatedStorySections = story.sections.filter(
        (s) => s.language === language,
      );
    }

    if (translatedStoryDetails && translatedStorySections) {
      console.log('found translated story');
      return story;
    }

    if (!translatedStoryDetails) {
      const translatedTitle = await this.translationService.translateText(
        originalStoryDetails.title,
        fallbackLanguage,
        language,
      );

      const translatedDescription = await this.translationService.translateText(
        originalStoryDetails.description,
        fallbackLanguage,
        language,
      );

      await this.prisma.storyTranslation.create({
        data: {
          storyId: story.id,
          language: language,
          title: translatedTitle,
          description: translatedDescription,
        },
      });

      if (!translatedStorySections.length && generateSections) {
        await Promise.all(
          originalStorySections.map(async (section) => {
            const translatedText = await this.translationService.translateText(
              section.text,
              fallbackLanguage,
              language,
            );

            return this.prisma.section.create({
              data: {
                storyId: story.id,
                language: language,
                text: translatedText,
                order: section.order,
                imageUrl: section.imageUrl,
              },
            });
          }),
        );
      }

      return this.findStoryById(story.id, language);
    }
  }

  async findStoryById(storyId: number, language: string) {
    return await this.prisma.story.findFirst({
      where: {
        id: storyId,
      },
      include: {
        sections: {
          where: {
            language: { in: [language, 'de'] },
          },
          orderBy: { order: 'asc' },
        },
        details: {
          where: {
            language: { in: [language, 'de'] },
          },
        },
      },
    });
  }

  async findStoryByDate(date: Date, language: string) {
    const inputDate = new Date(date);
    const today = new Date();

    if (inputDate > today) {
      throw new Error('Nur Daten bis einschließlich heute sind erlaubt.');
    }

    const formattedDate = formatDate(inputDate);

    const existingStory = await this.prisma.story.findFirst({
      where: {
        scheduledAt: formattedDate,
      },
      include: {
        sections: {
          where: {
            language: { in: [language, 'de'] },
          },
          orderBy: { order: 'asc' },
        },
        details: {
          where: {
            language: { in: [language, 'de'] },
          },
        },
      },
    });

    if (existingStory) {
      return this.prepareStoryForFrontend(existingStory, language);
    } else if (!existingStory && formattedDate === formatDate(today)) {
      const unscheduled = await this.prisma.story.findFirst({
        where: {
          scheduledAt: null,
        },
        orderBy: { createdAt: 'asc' },
        include: {
          sections: {
            orderBy: { order: 'asc' },
          },
          details: {
            where: { language: language },
          },
        },
      });

      if (!unscheduled) return null;

      await this.assignScheduledDate(unscheduled.id, formattedDate);

      const newlyScheduledStore = {
        ...unscheduled,
        scheduledAt: formattedDate,
      };

      return this.prepareStoryForFrontend(newlyScheduledStore, language);
    }
    // todo: fallback if anything above did not work
    return null;
  }

  async generateAndSaveStory() {
    const storyData = await this.aiService.generateStory();

    const storyImageUrl = await this.aiService.generateCoverImageForStory(
      storyData.title,
    );

    const story = await this.prisma.story.create({
      data: {
        imageUrl: storyImageUrl,
      },
    });

    await this.prisma.storyTranslation.create({
      data: {
        storyId: story.id,
        language: 'de',
        title: storyData.title,
        description: storyData.description,
      },
    });

    await Promise.all(
      storyData.sections.map((text, index) =>
        this.prisma.section.create({
          data: {
            text,
            order: index,
            language: 'de',
            storyId: story.id,
          },
        }),
      ),
    );

    return this.prisma.story.findUnique({
      where: { id: story.id },
      include: { sections: true },
    });
  }

  async getAllAvailableStories(language: string) {
    const formattedDate = formatDate(new Date());

    let availableStories = await this.prisma.story.findMany({
      where: {
        scheduledAt: {
          lte: formattedDate,
        },
      },
      include: {
        details: {
          where: {
            language: { in: [language, 'de'] },
          },
        },
      },
    });

    availableStories = availableStories.filter((story) => story.details.length);

    return await Promise.all(
      availableStories.map(async (story) => {
        const translatedStory = await this.translateStory(
          story,
          language,
          false,
        );
        return storyWithoutSectionsDtoMaker(translatedStory, language);
      }),
    );
  }

  async generateImageForStory() {
    await this.aiService.generateCoverImageForStory(
      'Das Abenteuer der kleinen Eule Ella',
    );
  }

  async findSectionTextById(
    storyId: string | number,
    sectionId: string | number,
  ): Promise<string> {
    const section = await this.prisma.section.findFirst({
      where: {
        id: Number(sectionId),
        storyId: Number(storyId),
      },
    });

    if (!section) throw new Error('Keine Section gefunden!');

    return section.text;
  }
}
