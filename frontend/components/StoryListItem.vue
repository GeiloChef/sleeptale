<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-col gap-4">
      <span class="text-2xl">
        {{ story.title }}
      </span>

      <span class="text-sm">
        {{ story.description }}
      </span>
      <span class="italic">
        {{ moment(story.scheduledAt).format(MomentFormat.DateDisplay) }}
      </span>
    </div>
  </div>
</template>


<script setup lang="ts">
import moment from "moment/moment";
import {MomentFormat} from "@/types/Core.Types";
import type {StoryWithoutSections} from "@/types/Story.types";
import {type PropType, toRefs} from "vue";

const props = defineProps({
  story: {
    type: Object as PropType<StoryWithoutSections>,
    required: true
  },
});

const { story } = toRefs(props);
</script>