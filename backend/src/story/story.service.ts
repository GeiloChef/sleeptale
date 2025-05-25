// src/story/story.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { formatDate } from '../common/utils/date.utils';
import {
  StoryWithoutSectionsDto,
  storyWithoutSectionsDtoMaker,
  StoryWithSectionsDto,
  storyWithSectionsDtoMaker,
} from './dto/story.dto';
import { TranslationService } from '../translation/translation.service';
import { Section, Story, StoryTranslation } from '@prisma/client';
import { FALLBACK_LANGUAGE } from './types/story.types';

@Injectable()
export class StoryService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
    private translationService: TranslationService,
  ) {}

  /**
   * @description Assigns a given date to a story to schedule it on a certain date.
   * @param storyId
   * @param date
   */
  async assignScheduledDate(storyId: number, date: string): Promise<void> {
    return this.prisma.story.update({
      where: { id: storyId },
      data: { scheduledAt: date },
    });
  }

  /**
   * @description Wrapper method that prepares a Story from the database for the frontend. What it does is, checking
   * if the story has the needed translation, and if not, firstly create it, and then return a ready-to-use story dto with
   * only the information in the language the user requested it.
   * @param story
   * @param language
   */
  async prepareStoryForFrontend(
    story: Story & { details: StoryTranslation[]; sections?: Section[] },
    language: string,
  ): Promise<StoryWithoutSectionsDto> {
    const translatedStory = await this.translateStory(story, language);

    return storyWithSectionsDtoMaker(translatedStory, language);
  }

  /**
   * @description Translates a given story by either checking if the required translation is already in the database, or by
   * just creating the translations calling the DeepL api.
   * @param story
   * @param language
   * @param generateSections
   */
  async translateStory(
    story: Story & { details: StoryTranslation[]; sections?: Section[] },
    language: string,
    generateSections = true,
  ): Promise<Story & { details: StoryTranslation[]; sections?: Section[] }> {
    const fallbackLanguage = FALLBACK_LANGUAGE;

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

  /**
   * Find a certain story by its id. Includes all sections and details.
   * @param storyId
   * @param language
   */
  async findStoryById(
    storyId: number,
    language: string,
  ): Promise<Story & { details: StoryTranslation[]; sections?: Section[] }> {
    return await this.prisma.story.findFirst({
      where: {
        id: storyId,
      },
      include: {
        sections: {
          where: {
            language: { in: [language, FALLBACK_LANGUAGE] },
          },
          orderBy: { order: 'asc' },
        },
        details: {
          where: {
            language: { in: [language, FALLBACK_LANGUAGE] },
          },
        },
      },
    });
  }

  /**
   * Fetch story from database by id
   * @param date
   * @param language
   */
  async findStoryByDate(
    date: Date,
    language: string,
  ): Promise<StoryWithSectionsDto> {
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
            language: { in: [language, FALLBACK_LANGUAGE] },
          },
          orderBy: { order: 'asc' },
        },
        details: {
          where: {
            language: { in: [language, FALLBACK_LANGUAGE] },
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

  /**
   * Generates a new story with the given attributes ad returns
   * @returns the newly created story
   */
  async generateAndSaveStory(): Promise<
    Story & { details: StoryTranslation[]; sections?: Section[] }
  > {
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
        language: FALLBACK_LANGUAGE,
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
            language: FALLBACK_LANGUAGE,
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

  /**
   * Return all available stories with the given attributes but without sectzions
   * @param language
   */
  async getAllAvailableStories(
    language: string,
  ): Promise<StoryWithoutSectionsDto[]> {
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
            language: { in: [language, FALLBACK_LANGUAGE] },
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

  /**
   * Starts the image generation for a story
   */
  async generateImageForStory(): Promise<void> {
    await this.aiService.generateCoverImageForStory(
      'Das Abenteuer der kleinen Eule Ella',
    );
  }

  /**
   * Find a certain section text by its section id. A language is not needed, as the section id is unique.
   * @param storyId
   * @param sectionId
   */
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
