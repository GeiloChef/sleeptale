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
import {
  FALLBACK_LANGUAGE,
  StoryAgeGroup,
  StoryFromDatabase,
  StoryGenre,
} from './types/story.types';
import { SourceLanguageCode, TargetLanguageCode } from 'deepl-node';
import { GenreService } from '../genre/genre.service';

@Injectable()
export class StoryService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
    private translationService: TranslationService,
    private genreService: GenreService,
  ) {}

  /**
   * @description Assigns a given date to a story to schedule it on a certain date.
   * @param storyId
   * @param date
   */
  async assignScheduledDate(storyId: number, date: string): Promise<Story> {
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
    story: StoryFromDatabase,
    language: string,
  ): Promise<any> {
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
    story: StoryFromDatabase,
    language: string,
    generateSections = true,
  ): Promise<StoryFromDatabase> {
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
      return story;
    }

    if (!translatedStoryDetails) {
      const translatedTitle = await this.translationService.translateText(
        originalStoryDetails.title,
        fallbackLanguage,
        language as TargetLanguageCode,
      );

      const translatedDescription = await this.translationService.translateText(
        originalStoryDetails.description,
        fallbackLanguage,
        language as TargetLanguageCode,
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
              language as TargetLanguageCode,
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
  ): Promise<StoryFromDatabase> {
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
        genre: true,
      },
    });
  }

  /**
   * Fetch story from database by id
   * @param id
   * @param language
   */
  async prepareStoryByIdForFrontend(
    id: number,
    language: string,
  ): Promise<StoryWithSectionsDto> {
    const storyById = await this.prisma.story.findFirst({
      where: {
        id: id,
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
        genre: true,
      },
    });

    return this.prepareStoryForFrontend(storyById, language);
  }

  /**
   * Fetch story from database by date
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
        genre: true,
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
          genre: true,
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
  async generateAndSaveStory(
    ageGroup: StoryAgeGroup,
    genre?: StoryGenre,
  ): Promise<any> {
    const storyData = await this.aiService.generateStoryByAgeAndGenre(
      ageGroup,
      genre,
    );

    const storyImageUrl = await this.aiService.generateCoverImageForStory(
      storyData.title,
    );

    const genreId = await this.genreService.getGenreIdByKey(
      storyData.genre.key,
    );

    const story = await this.prisma.story.create({
      data: {
        imageUrl: storyImageUrl,
        genreId: genreId,
        ageGroup: ageGroup,
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
      include: { sections: true, details: true, genre: true },
    });
  }

  /**
   * Return all available stories with the given attributes but without sections
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
        genre: true,
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

  async searchStories(params: {
    query?: string;
    genre: string[];
    ageGroup: string[];
    limit: number;
    cursor?: number;
    language: string;
  }) {
    const { query, genre, ageGroup, limit, cursor, language } = params;
    const fallbackLanguage = FALLBACK_LANGUAGE;

    let matchedIdsArray: number[] | undefined = undefined;

    // Step 1: Only search for title/description if query is provided
    if (query && query.trim().length > 0) {
      const matchedStoryIds = new Set<number>();

      // 1. Search translations in requested language
      const userLangMatches = await this.prisma.storyTranslation.findMany({
        where: {
          language,
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
          ],
        },
        select: { storyId: true },
      });

      userLangMatches.forEach((t) => matchedStoryIds.add(t.storyId));

      // 2. Translate query into fallback language (if needed)
      let translatedQuery = query;
      if (language !== fallbackLanguage) {
        translatedQuery = await this.translationService.translateText(
          query,
          language,
          fallbackLanguage,
        );
      }

      // 3. Search fallback translations
      const fallbackMatches = await this.prisma.storyTranslation.findMany({
        where: {
          language: fallbackLanguage,
          OR: [
            { title: { contains: translatedQuery } },
            { description: { contains: translatedQuery } },
          ],
        },
        select: { storyId: true },
      });

      fallbackMatches.forEach((t) => matchedStoryIds.add(t.storyId));

      matchedIdsArray = Array.from(matchedStoryIds);

      // Early return: query provided but no matches found
      if (matchedIdsArray.length === 0) {
        return {
          stories: [],
          nextCursor: null,
        };
      }
    }

    // Step 2: Query the actual stories
    const stories = await this.prisma.story.findMany({
      where: {
        ...(matchedIdsArray
          ? {
              id: {
                in: matchedIdsArray,
                ...(cursor ? { lt: cursor } : {}),
              },
            }
          : cursor
            ? {
                id: { lt: cursor },
              }
            : {}),
        ...(genre.length > 0 ? { genre: { key: { in: genre } } } : {}),
        ...(ageGroup.length > 0 ? { ageGroup: { in: ageGroup } } : {}),
        scheduledAt: {
          not: null,
        },
      },
      include: {
        genre: true,
        details: {
          where: { language },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit + 1,
    });

    // Step 3: Paginate results
    const hasMore = stories.length > limit;
    const paginated = hasMore ? stories.slice(0, limit) : stories;

    // Step 4: Translate if no detail in target language
    const results = await Promise.all(
      paginated.map(async (story) => {
        const translation = story.details[0];
        if (!translation) {
          const fallbackStory = await this.findStoryById(
            story.id,
            fallbackLanguage,
          );
          return this.translateStory(fallbackStory, language, false);
        }

        return {
          id: story.id,
          createdAt: story.createdAt,
          imageUrl: story.imageUrl,
          ageGroup: story.ageGroup,
          genre: story.genre,
          scheduledAt: story.scheduledAt,
          details: [translation],
        };
      }),
    );

    const nextCursor = hasMore ? paginated[paginated.length - 1].id : null;

    return {
      stories: results.map((story: StoryFromDatabase) =>
        storyWithoutSectionsDtoMaker(story, language),
      ),
      nextCursor,
    };
  }
}
