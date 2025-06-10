<template>
  <Tag
    :style="ageGroupStyles"
    class="text-white">
    <span>{{ $t(selectedAgeGroup.label) }}</span>
  </Tag>
</template>

<script setup lang="ts">
import {AgeGroupTypes} from "@/types/Story.types";
import type {PropType} from "vue";
import {getAgeGroups} from "@/utils/Story.Utils";
import type {Dictionary} from "@/types/Core.Types";

const props = defineProps({
  ageGroup: {
    type: String as PropType<AgeGroupTypes>,
    required: true
  },
});

const ageGroups = getAgeGroups();

const selectedAgeGroup = computed((): Dictionary<AgeGroupTypes> => {
  return ageGroups.find((group) => group.value === props.ageGroup) ?? ageGroups[0];
});

const genreColorMap: Record<string, string> = {
  KIDS: '--age-group-kids',
  TEENS: '--age-group-teens',
  ADULTS: '--age-group-adults'
};

const ageGroupStyles = computed(() => {
  const cssVarName = genreColorMap[props.ageGroup];

  if (cssVarName) {
    return {
      'background': `var(${cssVarName})`,
      'color': 'white'
    };
  }
  return {};
});

</script>

<style lang="scss">
@use '../../assets/css/_colors.scss';

:root {
  --age-group-kids: #{colors.$age-group-kids};
  --age-group-teens: #{colors.$age-group-teenagers};
  --age-group-adults: #{colors.$age-group-adults};
}
</style>