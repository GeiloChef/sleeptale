<template>
  <div class="flex flex-wrap gap-x-6 gap-y-4">
    <GenreTag
      v-for="genre in allAvailableGenres"
      :key="genre.id"
      :genre-key="genre.key"
      class="w-full border-2"
      :class="{
        'border-green-500' : isGenreSelected(genre),
        'border-transparent': !isGenreSelected(genre)
      }"
      @click="selectGenre(genre)"/>
  </div>
</template>

<script setup lang="ts">
import GenreTag from "@/components/partials/GenreTag.vue";
import type {Genre} from "@/types/Genre.types";

const userStore = useUserStore();
const { favoriteGenres } = storeToRefs(userStore);

const genreStore = useGenreStore();
const { allAvailableGenres } = storeToRefs(genreStore);

const selectGenre = (genre: Genre): void => {
  if (favoriteGenres.value.includes(genre.id)) {
    favoriteGenres.value = favoriteGenres.value.filter((selectedGenreId) => selectedGenreId !== genre.id);
  } else {
    favoriteGenres.value.push(genre.id);
  }
}

const isGenreSelected = (genre: Genre): boolean => {
  return favoriteGenres.value.includes(genre.id)
}
</script>