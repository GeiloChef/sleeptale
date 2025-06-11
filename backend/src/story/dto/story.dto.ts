import { Story, StoryTranslation, Section, Genre } from '@prisma/client';
import { StoryAgeGroup } from '../types/story.types';

export interface StoryWithSectionsDto {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  scheduledAt?: string;
  genre: string;
  ageGroup: string;
  sections: Section[];
}

export interface StoryWithoutSectionsDto {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  genre: string;
  ageGroup: string;
  scheduledAt?: string;
}

export function storyWithSectionsDtoMaker(
  story: Story & {
    details: StoryTranslation[];
    sections?: Section[];
    genre: Genre;
  },
  lang: string,
): StoryWithSectionsDto {
  const translation =
    story.details.find((t) => t.language === lang) ?? story.details[0];

  return {
    id: story.id,
    title: translation?.title ?? '',
    description: translation?.description ?? '',
    imageUrl: story.imageUrl ?? undefined,
    scheduledAt: story.scheduledAt ?? undefined,
    genre: story.genre.key,
    ageGroup: story.ageGroup,
    sections: story.sections
      ? story.sections.filter((section) => section.language === lang)
      : [],
  };
}

export function storyWithoutSectionsDtoMaker(
  story: Story & {
    details: StoryTranslation[];
    sections?: Section[];
    genre: Genre;
  },
  lang: string,
): StoryWithoutSectionsDto {
  const translation =
    story.details.find((t) => t.language === lang) ?? story.details[0];

  return {
    id: story.id,
    title: translation?.title ?? '',
    description: translation?.description ?? '',
    imageUrl: story.imageUrl ?? undefined,
    genre: story.genre.key,
    ageGroup: story.ageGroup,
    scheduledAt: story.scheduledAt ?? undefined,
  };
}

export class FetchStoriesDto {
  ids: number[];
}
