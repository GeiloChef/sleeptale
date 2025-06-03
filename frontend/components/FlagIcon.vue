<template>
  <div>
    <span :class="`fi fi-${flagCode}`"></span>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  flagCode: {
    type: String,
    required: true
  },
});

const { flagCode } = toRefs(props);
</script>