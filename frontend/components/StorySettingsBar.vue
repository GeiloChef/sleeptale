<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row gap-3">
      <DecreaseFontSizeIcon @click="applicationStore.decreaseFontSize" />
      <IncreaseFontSizeIcon @click="applicationStore.increaseFontSize" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IncreaseFontSizeIcon from "@/components/icons/IncreaseFontSizeIcon.vue";
import DecreaseFontSizeIcon from "@/components/icons/DecreaseFontSizeIcon.vue";
import { useApplicationStore } from "@/stores/Application.Store";

const applicationStore = useApplicationStore();
</script>