<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row gap-3">
      <DecreaseFontSizeIcon @click="applicationStore.decreaseFontSize" />
      <IncreaseFontSizeIcon @click="applicationStore.increaseFontSize" />
    </div>

    <Icon
      icon="bookmark"
      :class="{
        'text-green-500': isStoryFavorite,
        'text-white': !isStoryFavorite
      }"
      @click="onClickBookmark" />
  </div>
</template>

<script setup lang="ts">
import IncreaseFontSizeIcon from "@/components/icons/IncreaseFontSizeIcon.vue";
import DecreaseFontSizeIcon from "@/components/icons/DecreaseFontSizeIcon.vue";
import { useApplicationStore } from "@/stores/Application.Store";
import {useUserStore} from "@/.nuxt/imports";

const applicationStore = useApplicationStore();

const storyStore = useStoryStore();
const { selectedStory } = storeToRefs(storyStore);

const userStore = useUserStore();
const { favoriteStories } = storeToRefs(userStore);

const isStoryFavorite = computed((): boolean => {
  return favoriteStories.value.some(fav => fav.id === selectedStory.value.id);
});

const onClickBookmark = (): void => {
  if (isStoryFavorite.value) {
    userStore.removeStoryFromFavorites(selectedStory.value.id);
  } else {
    userStore.addStoryAsFavorite(selectedStory.value.id)
  }
}
</script>