<template>
  <div class="flex flex-col gap-8">
    <span class="text-2xl text-center">
      {{ $t('user-settings') }}
    </span>
    <div class="flex flex-col gap-4">
      <Divider />
      <AgeGroupPreferenceSelection />
      <Divider />
      <div class="flex flex-row justify-between items-center">
        <span class="text-lg italic">
          {{ $t('language') }}
        </span>
      <LanguageSelect class="!w-3/5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LanguageSelect from "@/components/LanguageSelect.vue";
</script>