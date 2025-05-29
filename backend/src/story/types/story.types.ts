import { Genre, Section, Story, StoryTranslation } from '@prisma/client';

export const FALLBACK_LANGUAGE = 'de';

export enum StoryAgeGroup {
  Kids = 'KIDS',
  Teens = 'TEENS',
  Adults = 'ADULTS',
}

export interface StoryGenre {
  key: string;
  label: string;
  promptModifier: string;
  ageGroups: StoryAgeGroup[];
}

export type StoryFromDatabase = Story & {
  details: StoryTranslation[];
  sections?: Section[];
  genre: Genre;
};

export const STORY_GENRES: StoryGenre[] = [
  {
    key: 'bedtime',
    label: 'genre.bedtime',
    ageGroups: [StoryAgeGroup.Kids],
    promptModifier:
      'Die Geschichte soll beruhigend sein, mit einem friedlichen Ende abschließen und ideal als gute Nacht Geschichte geeignet sein.',
  },
  {
    key: 'adventure',
    label: 'genre.adventure',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier: 'Die Geschichte soll abenteuerlich sein und ',
  },
  {
    key: 'fantasy',
    label: 'genre.fantasy',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll Elemente von Magie, Fabelwesen oder einer fantastischen Welt enthalten.',
  },
  {
    key: 'sci-fi',
    label: 'genre.science-fiction',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll in der Zukunft oder in einem technologischen Umfeld spielen.',
  },
  {
    key: 'romance',
    label: 'genre.romance',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Es soll sich eine romantische Handlung zwischen zwei Personen entwickeln.',
  },
  {
    key: 'comedy',
    label: 'genre.comedy',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll humorvoll und unterhaltsam sein und den Leser zum Lachen bringe.',
  },
  {
    key: 'educational',
    label: 'genre.educational',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens],
    promptModifier:
      'Die Geschichte soll lehrreich sein und dem Leser auf spielerische Weise Wissen vermitteln.',
  },
  {
    key: 'mystery',
    label: 'genre.mystery',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Baue eine rätselhafte oder unerwartete Wendung in die Geschichte ein, die den Leser eine angenehme Aufregung spüren lässt.',
  },
  {
    key: 'horror',
    label: 'genre.horror',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll düster, mysteriös und leicht beängstigend sein.',
  },
  {
    key: 'thriller',
    label: 'genre.thriller',
    ageGroups: [StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll spannend, nervenaufreibend und voller unerwarteter Wendungen sein. Sie darf gerne sehr schaurig sein!',
  },
  {
    key: 'drama',
    label: 'genre.drama',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll emotionale Tiefe haben und zwischenmenschliche Konflikte thematisieren.',
  },
  {
    key: 'historical',
    label: 'genre.historical',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll in einem historischen Kontext spielen und authentische Ereignisse oder Figuren einbeziehen.',
  },
  {
    key: 'slice-of-life',
    label: 'genre.slice-of-life',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll alltägliche Situationen und zwischenmenschliche Beziehungen realistisch darstellen.',
  },
  {
    key: 'mythology',
    label: 'genre.mythology',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll Elemente aus bekannten oder fiktiven Mythen, Göttern und Sagen enthalten.',
  },
  {
    key: 'folktale',
    label: 'genre.folktale',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll den Stil klassischer Volksmärchen haben und eine klare moralische Botschaft enthalten.',
  },
  {
    key: 'supernatural',
    label: 'genre.supernatural',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll übernatürliche Elemente wie Geister, Flüche oder Unerklärliches beinhalten.',
  },
  {
    key: 'psychological',
    label: 'genre.psychological',
    ageGroups: [StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll psychologisch tiefgründig sein und innere Konflikte oder mentale Prozesse thematisieren.',
  },
  {
    key: 'dystopian',
    label: 'genre.dystopian',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll in einer dystopischen Zukunft spielen und gesellschaftliche Missstände überzeichnen.',
  },
  {
    key: 'feel-good',
    label: 'genre.feel-good',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll in einer dystopischen Zukunft spielen und gesellschaftliche Missstände überzeichnen.',
  },
];
