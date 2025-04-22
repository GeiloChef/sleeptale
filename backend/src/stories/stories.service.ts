// src/stories/stories.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {AiService} from "../ai/ai.service";

@Injectable()
export class StoriesService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService
  ) {}

  async create(title: string, content: string) {
    return this.prisma.story.create({
      data: {
        title,
        sections: {
          create: [{ text: 'test2', order: 1 }],
        }
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

  async assignScheduledDate(storyId: number, date: Date) {
    return this.prisma.story.update({
      where: { id: storyId },
      data: { scheduledAt: date },
    });
  }

  async getStoryForToday() {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));


    const todayStory = await this.prisma.story.findFirst({
      where: {
        scheduledAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (todayStory) return todayStory;

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

    await this.assignScheduledDate(unscheduled.id, startOfDay);

    return {
      ...unscheduled,
      scheduledAt: startOfDay,
    };
  }


  async findStoryByDate(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate > yesterday) {
      //todo: return correct state object to display issue
      throw new Error('Nur Daten bis einschließlich gestern sind erlaubt.');
      console.log('Nur Daten bis einschließlich gestern sind erlaubt.');
    }

    const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999));

    const existingStory = this.prisma.story.findFirst({
      where: {
        scheduledAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return existingStory ?? null;
    // todo: If no story exists, we could create one without images just to be fancy
  }

  async generateAndSaveStory() {
    const storyData = await this.aiService.generateStory();

    console.dir(storyData);

    const story = await this.prisma.story.create({
      data: {
        title: storyData.title,
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
    });;
  }
}
