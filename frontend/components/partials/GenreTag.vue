<template>
  <Tag
    :style="genreStyles"
    class="text-white">
    <Icon :icon="icon" class="text-white" />
    <span>{{ $t(selectedGenre.label) }}</span>
  </Tag>
</template>

<script setup lang="ts">

import {type Genre, GenreIcons} from "@/types/Genre.types";

const genreStore = useGenreStore();
const { allAvailableGenres } = storeToRefs(genreStore);

const props = defineProps({
  genreKey: {
    type: String,
    required: true
  },
});

const selectedGenre = computed((): Genre => {
  return allAvailableGenres.value.find((genre) => genre.key === props.genreKey) ?? allAvailableGenres.value[0];
});

const genreColorMap: Record<string, string> = {
  adventure: '--genre-adventure',
  bedtime: '--genre-bedtime',
  comedy: '--genre-comedy',
  drama: '--genre-drama',
  dystopian: '--genre-dystopian',
  educational: '--genre-educational',
  fantasy: '--genre-fantasy',
  'feel-good': '--genre-feel-good',
  folktale: '--genre-folktale',
  historical: '--genre-historical',
  horror: '--genre-horror',
  mystery: '--genre-mystery',
  mythology: '--genre-mythology',
  psychological: '--genre-psychological',
  romance: '--genre-romance',
  'sci-fi': '--genre-sci-fi',
  'slice-of-life': '--genre-slice-of-life',
  supernatural: '--genre-supernatural',
  thriller: '--genre-thriller',
};

const genreStyles = computed(() => {
  const cssVarName = genreColorMap[props.genreKey];

  if (cssVarName) {
    return {
      'background': `var(${cssVarName})`,
      'color': `var(${cssVarName}-text)`
    };
  }
  return {};
});

const icon = computed(() => {
  return GenreIcons[props.genreKey];
})
</script>

<style lang="scss">
@use '../../assets/css/_colors.scss';

:root {
  --genre-adventure: #{colors.$genre-adventure};
  --genre-bedtime: #{colors.$genre-bedtime};
  --genre-comedy: #{colors.$genre-comedy};
  --genre-drama: #{colors.$genre-drama};
  --genre-dystopian: #{colors.$genre-dystopian};
  --genre-educational: #{colors.$genre-educational};
  --genre-fantasy: #{colors.$genre-fantasy};
  --genre-feel-good: #{colors.$genre-feel-good};
  --genre-folktale: #{colors.$genre-folktale};
  --genre-historical: #{colors.$genre-historical};
  --genre-horror: #{colors.$genre-horror};
  --genre-mystery: #{colors.$genre-mystery};
  --genre-mythology: #{colors.$genre-mythology};
  --genre-psychological: #{colors.$genre-psychological};
  --genre-romance: #{colors.$genre-romance};
  --genre-sci-fi: #{colors.$genre-sci-fi};
  --genre-slice-of-life: #{colors.$genre-slice-of-life};
  --genre-supernatural: #{colors.$genre-supernatural};
  --genre-thriller: #{colors.$genre-thriller};

  --genre-adventure-text: #{colors.$genre-adventure-text};
  --genre-bedtime-text: #{colors.$genre-bedtime-text};
  --genre-comedy-text: #{colors.$genre-comedy-text};
  --genre-drama-text: #{colors.$genre-drama-text};
  --genre-dystopian-text: #{colors.$genre-dystopian-text};
  --genre-educational-text: #{colors.$genre-educational-text};
  --genre-fantasy-text: #{colors.$genre-fantasy-text};
  --genre-feel-good-text: #{colors.$genre-feel-good-text};
  --genre-folktale-text: #{colors.$genre-folktale-text};
  --genre-historical-text: #{colors.$genre-historical-text};
  --genre-horror-text: #{colors.$genre-horror-text};
  --genre-mystery-text: #{colors.$genre-mystery-text};
  --genre-mythology-text: #{colors.$genre-mythology-text};
  --genre-psychological-text: #{colors.$genre-psychological-text};
  --genre-romance-text: #{colors.$genre-romance-text};
  --genre-sci-fi-text: #{colors.$genre-sci-fi-text};
  --genre-slice-of-life-text: #{colors.$genre-slice-of-life-text};
  --genre-supernatural-text: #{colors.$genre-supernatural-text};
  --genre-thriller-text: #{colors.$genre-thriller-text};
}
</style>