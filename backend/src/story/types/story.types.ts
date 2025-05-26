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

export const STORY_GENRES: StoryGenre[] = [
  {
    key: 'bedtime',
    label: 'Bedtime',
    ageGroups: [StoryAgeGroup.Kids],
    promptModifier:
      'Die Geschichte soll beruhigend sein, mit einem friedlichen Ende abschließen und ideal als gute Nacht Geschichte geeignet sein.',
  },
  {
    key: 'adventure',
    label: 'Adventure',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier: 'Die Geschichte soll abenteuerlich sein und ',
  },
  {
    key: 'fantasy',
    label: 'Fantasy',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll Elemente von Magie, Fabelwesen oder einer fantastischen Welt enthalten.',
  },
  {
    key: 'sci-fi',
    label: 'Science Fiction',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll in der Zukunft oder in einem technologischen Umfeld spielen.',
  },
  {
    key: 'romance',
    label: 'Romance',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Es soll sich eine romantische Handlung zwischen zwei Personen entwickeln.',
  },
  {
    key: 'comedy',
    label: 'Comedy',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll humorvoll und unterhaltsam sein und den Leser zum Lachen bringe.',
  },
  {
    key: 'educational',
    label: 'Educational',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens],
    promptModifier:
      'Die Geschichte soll lehrreich sein und dem Leser auf spielerische Weise Wissen vermitteln.',
  },
  {
    key: 'mystery',
    label: 'Mystery',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Baue eine rätselhafte oder unerwartete Wendung in die Geschichte ein, die den Leser eine angenehme Aufregung spüren lässt.',
  },
  {
    key: 'horror',
    label: 'Horror',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll düster, mysteriös und leicht beängstigend sein.',
  },
  {
    key: 'thriller',
    label: 'Thriller',
    ageGroups: [StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll spannend, nervenaufreibend und voller unerwarteter Wendungen sein. Sie darf gerne sehr schaurig sein!',
  },
  {
    key: 'drama',
    label: 'Drama',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll emotionale Tiefe haben und zwischenmenschliche Konflikte thematisieren.',
  },
  {
    key: 'historical',
    label: 'Historical',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll in einem historischen Kontext spielen und authentische Ereignisse oder Figuren einbeziehen.',
  },
  {
    key: 'slice-of-life',
    label: 'Slice of Life',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll alltägliche Situationen und zwischenmenschliche Beziehungen realistisch darstellen.',
  },
  {
    key: 'mythology',
    label: 'Mythology',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll Elemente aus bekannten oder fiktiven Mythen, Göttern und Sagen enthalten.',
  },
  {
    key: 'folktale',
    label: 'Folktale',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll den Stil klassischer Volksmärchen haben und eine klare moralische Botschaft enthalten.',
  },
  {
    key: 'supernatural',
    label: 'Supernatural',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll übernatürliche Elemente wie Geister, Flüche oder Unerklärliches beinhalten.',
  },
  {
    key: 'psychological',
    label: 'Psychological',
    ageGroups: [StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll psychologisch tiefgründig sein und innere Konflikte oder mentale Prozesse thematisieren.',
  },
  {
    key: 'dystopian',
    label: 'Dystopian',
    ageGroups: [StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll in einer dystopischen Zukunft spielen und gesellschaftliche Missstände überzeichnen.',
  },
  {
    key: 'feel-good',
    label: 'Feel-Good',
    ageGroups: [StoryAgeGroup.Kids, StoryAgeGroup.Teens, StoryAgeGroup.Adults],
    promptModifier:
      'Die Geschichte soll in einer dystopischen Zukunft spielen und gesellschaftliche Missstände überzeichnen.',
  },
];
