import { Genre } from '@prisma/client';

export interface GenreDto {
  id: number;
  key: string;
  label: string;
  ageGroups: string[];
}

export function genreDtoMaker(genre: Genre): GenreDto {
  const ageGroups = genre.ageGroups
    ? genre.ageGroups.split(',').map((item) => item.trim())
    : [];

  return {
    id: genre.id,
    key: genre.key,
    label: genre.label,
    ageGroups,
  };
}
