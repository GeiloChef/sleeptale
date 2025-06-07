<template>
  <div class="w-full border-t border-t-white flex justify-around items-center h-20">
    <div
      v-for="item in navigationItems"
      :key="item.label"
      class="flex flex-col gap-2 w-1/4"
      @click="item.callback">
      <Icon
          size="lg"
          :icon="item.icon" />
      <span class="text-xs text-center italic">
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">

import {MomentFormat} from "@/types/Core.Types";

const { t } = useI18n();

const navigationItems = [
  {
    label: t('home'),
    icon: 'home',
    callback: () => {navigateByRouteName('index')}
  },
  {
    label: t('daily-story'),
    icon: 'calendar-days',
    callback: () => {navigateToStoryPage({
        date: moment().format(MomentFormat.DateUrl),
        id: undefined,
        ageGroup: useUserStore().user.getUserAgeGroup()
      }
    )}
  },
  {
    label: t('profile'),
    icon: 'user',
    callback: () => {navigateByRouteName('user')}
  },
]
</script>