<template>
  <Menubar class="flex menubar">
    <template #start>
      <Button
          type="button"
          @click="toggleMenu"
          aria-haspopup="true"
          aria-controls="overlay_menu">
          <Icon
              icon="bars"
              size="sm" />
      </Button>

      <Menu
          ref="Menu_Ref"
          id="overlay_menu"
          :model="items"
          :popup="true">
        <template #itemicon="{ item }">
          <Icon :icon="item.icon" />
        </template>
      </Menu>
    </template>

    <template #button>
      <div class="w-full flex justify-center items-center">
        {{ $t('sleeptale') }}
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">

import {navigateToStoryPage} from "@/utils/Story.Utils";
import {MomentFormat} from "@/types/Core.Types";
import {navigateByRouteName} from "@/utils/Navigation.Utils";

const router = useRouter();
const Menu_Ref = ref();

const toggleMenu = (event: Event): void => {
  Menu_Ref.value.toggle(event);
}

const items = ref([
  {
    label: $t('story-of-the-day'),
    icon: 'book-open',
    command: () => {
      navigateToStoryPage(moment().format(MomentFormat.DateUrl));
    }
  },
  {
    label: $t('all-stories'),
    icon: 'bars-staggered',
    command: () => {
      navigateByRouteName('stories')
    }
  },
]);
</script>

<style lang="scss" scoped>
.menubar {
  font-size: 1.2rem;
}
</style>