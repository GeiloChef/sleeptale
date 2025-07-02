import { FALLBACK_LANGUAGE } from '../../story/types/story.types';

export function getLanguageFromHeader(
  headerValue?: string,
  fallback = FALLBACK_LANGUAGE,
): string {
  if (!headerValue) return fallback;

  const languages = headerValue.split(',').map((l) => l.trim().toLowerCase());

  const supported = ['de', 'en', 'es'];
  const firstValid = languages.find((lang) => supported.includes(lang));

  return firstValid ?? fallback;
}
