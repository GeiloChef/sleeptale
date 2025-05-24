// src/stories/stories.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { formatDate } from '../common/utils/date.utils';
import {
  storyWithoutSectionsDtoMaker,
  storyWithSectionsDtoMaker,
} from './dto/story.dto';

@Injectable()
export class StoriesService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
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

  async findStoryByDate(date: Date) {
    const inputDate = new Date(date);
    const today = new Date();
    const language = 'de';

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
          orderBy: { order: 'asc' },
        },
        details: {
          where: { language: language }, // or pass from query/context
          take: 1,
        },
      },
    });

    if (existingStory) {
      return storyWithSectionsDtoMaker(existingStory, language);
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
          details: {},
        },
      });

      if (!unscheduled) return null;

      await this.assignScheduledDate(unscheduled.id, formattedDate);

      const newlyScheduledStore = {
        ...unscheduled,
        scheduledAt: formattedDate,
      };

      return storyWithSectionsDtoMaker(newlyScheduledStore, language);
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

  async getAllAvailableStories() {
    const formattedDate = formatDate(new Date());
    const language = 'de';

    const availableStories = await this.prisma.story.findMany({
      where: {
        scheduledAt: {
          lte: formattedDate,
        },
      },
      include: {
        details: {
          where: { language: language },
          take: 1,
        },
      },
    });
    return (
      availableStories.map((story) =>
        storyWithoutSectionsDtoMaker(story, language),
      ) || []
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
