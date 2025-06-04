<template>
  <Menubar class="flex menubar">
    <template #start>
      <Button
          v-if="showBackButton"
          type="button"
          @click="goBack"
          aria-haspopup="true"
          severity="secondary"
          aria-controls="overlay_menu">
          <Icon
              icon="arrow-left"
              size="sm" />
      </Button>
    </template>

    <template #end>
      <Icon icon="magnifying-glass" @click="navigateByRouteName('search')"></Icon>
    </template>

    <template #button>
      <div class="w-full flex justify-center items-center">
        {{ $t('sleeptale') }}
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import { navigateByRouteName } from "@/utils/Navigation.Utils";

const props = defineProps({
  showBackButton: {
    type: Boolean,
    required: true
  },
});

const router = useRouter();

const goBack = (): void => {
  router.back();
}
</script>

<style lang="scss" scoped>
.menubar {
  font-size: 1.2rem;
}
</style>