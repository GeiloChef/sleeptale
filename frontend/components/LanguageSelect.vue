<template>
  <Select
      v-model="user"
      :options="availableLanguages"
      :placeholder="$t('select-a-language')"
      @update:modelValue="switchLanguage">
    <template #option="language">
      <div class="flex items-center">
        <div>{{ language.option.label }}</div>
      </div>
    </template>
  </Select>
</template>

<script setup lang="ts">

import type {Language} from "@/types/Core.Types";

const userStore = useUserStore();
const { user } = storeToRefs(userStore)

const availableLanguages = ref(getAvailableLanguages());

const { locale, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()


const switchLanguage = (language: Language): void => {
  switchLocalePath(language.i18nCode);
  setLocale(language.i18nCode);
  user.value.setUserLanguage(language)
}
</script>