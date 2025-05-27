export const imageUrl = (url: string): string => {
  const urlBasis = useRuntimeConfig().public.apiBase
    return `${urlBasis}${url}.png`;
}