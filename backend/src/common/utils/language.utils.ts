export function getLanguageFromHeader(
  headerValue?: string,
  fallback = 'de',
): string {
  if (!headerValue) return fallback;

  const languages = headerValue.split(',').map((l) => l.trim().toLowerCase());

  // Optionally: limit to supported languages
  const supported = ['de', 'en'];
  const firstValid = languages.find((lang) => supported.includes(lang));

  return firstValid ?? fallback;
}
