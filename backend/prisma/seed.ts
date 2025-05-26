import { PrismaClient } from '@prisma/client';
import { STORY_GENRES } from '../src/story/types/story.types';
const prisma = new PrismaClient();

async function main() {
  for (const genre of STORY_GENRES) {
    await prisma.genre.upsert({
      where: { key: genre.key },
      update: {},
      create: {
        key: genre.key,
        label: genre.label,
        ageGroups: genre.ageGroups.join(','),
      },
    });
  }
}

main().finally(() => prisma.$disconnect());
