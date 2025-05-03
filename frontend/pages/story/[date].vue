<template>
  <div>
    hallo test
  </div>
</template>


<script setup lang="ts">

import {onMounted} from "vue";
import {useRoute} from "nuxt/app";
import {MomentFormat} from "@/types/Core.Types";

const route = useRoute();

const storyStore = useStoryStore();

onMounted(async (): Promise<void> => {
  console.log()
  if (route.params.date) {
    await storyStore.fetchStoryByDate(moment(route.params.date, MomentFormat.Date));
  }
})
</script>