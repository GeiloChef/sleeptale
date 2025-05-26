import { Injectable, NotFoundException } from '@nestjs/common';
import {
  STORY_GENRES,
  StoryAgeGroup,
  StoryGenre,
} from '../story/types/story.types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async getGenreIdByKey(key: string): Promise<number> {
    const genre = await this.prisma.genre.findUnique({
      where: { key },
      select: { id: true },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with key "${key}" not found.`);
    }

    return genre.id;
  }

  async getRandomGenreForAgeGroup(
    ageGroup: StoryAgeGroup,
  ): Promise<StoryGenre> {
    const genres = await this.prisma.genre.findMany({
      where: {
        ageGroups: {
          contains: ageGroup,
        },
      },
    });

    if (!genres.length) {
      throw new NotFoundException(
        `No genres available for age group "${ageGroup}"`,
      );
    }

    const randomIndex = Math.floor(Math.random() * genres.length);
    const randomGenre = genres[randomIndex];

    return STORY_GENRES.find(
      (storyGenre) => storyGenre.key === randomGenre.key,
    );
  }
}
