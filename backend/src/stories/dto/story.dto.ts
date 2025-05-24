import { Story, StoryTranslation, Section } from '@prisma/client';

export interface StoryWithSectionsDto {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  scheduledAt?: string;
  sections: Section[];
}

export interface StoryWithoutSectionsDto {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  scheduledAt?: string;
}

export function storyWithSectionsDtoMaker(
  story: Story & { details: StoryTranslation[]; sections: Section[] },
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
    sections: story.sections.filter((section) => section.language === lang),
  };
}

export function storyWithoutSectionsDtoMaker(
  story: Story & { details: StoryTranslation[] },
  lang: string,
): StoryWithoutSectionsDto {
  const translation =
    story.details.find((t) => t.language === lang) ?? story.details[0];

  return {
    id: story.id,
    title: translation?.title ?? '',
    description: translation?.description ?? '',
    imageUrl: story.imageUrl ?? undefined,
    scheduledAt: story.scheduledAt ?? undefined,
  };
}
