// src/stories/stories.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { formatDate } from '../common/utils/date.utils';

@Injectable()
export class StoriesService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async create(title: string, content: string) {
    return this.prisma.story.create({
      data: {
        title,
        sections: {
          create: [{ text: 'test2', order: 1 }],
        },
      },
    });
  }

  async createTest() {
    return this.prisma.story.create({
      data: {
        title: 'Gute Nacht, Emely',
        sections: {
          create: [
            { text: 'Es war einmal eine kleine Schildkröte...', order: 1 },
            { text: 'Sie lebte in einem funkelnden Teich...', order: 2 },
          ],
        },
      },
      include: { sections: true },
    });
  }

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
      },
    });

    if (existingStory) {
      return existingStory;
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
        },
      });

      if (!unscheduled) return null;

      await this.assignScheduledDate(unscheduled.id, formattedDate);

      return {
        ...unscheduled,
        scheduledAt: formattedDate,
      };
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
        title: storyData.title,
        imageUrl: storyImageUrl,
        description: storyData.description,
      },
    });

    await Promise.all(
      storyData.sections.map((text, index) =>
        this.prisma.section.create({
          data: {
            text,
            order: index,
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

    const availableStories = await this.prisma.story.findMany({
      where: {
        scheduledAt: {
          lte: formattedDate,
        },
      },
    });
    return availableStories || [];
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
