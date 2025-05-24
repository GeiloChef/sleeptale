export const audioUrl = (url: string): string => {
  const urlBasis = useRuntimeConfig().public.apiBase
    return `${urlBasis}/audio/${url}`;
}