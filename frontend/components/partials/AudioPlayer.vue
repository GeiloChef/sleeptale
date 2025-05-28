<template>
  <div class="flex items-center gap-8 py-6 border-t-white border-t flex flex-row justify-center items-center relative">
    <div class="flex flex-row gap-8">
      <button @click="previous">
        <Icon icon="backward-step" size="xl" />
      </button>

      <button @click="togglePlay">
        <Icon v-if="!isPlaying" icon="play" size="xl" />
        <Icon v-else icon="pause" size="xl" />
      </button>

      <button @click="next">
        <Icon icon="forward-step" size="xl" />
      </button>
    </div>

    <button
        class="absolute right-4 top-1/2 -translate-y-1/2"
        @click="toggleVolumeSliderPopover">
      <Icon icon="volume-high" size="md" />
    </button>
    <Popover ref="VolumeSliderPopover_Ref">
      <Slider
          v-model="volume"
          orientation="vertical"
          @change="setVolume"
          :min="1"
          :max="100"
          class="h-48" />
    </Popover>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['changeTextToSpeechTrack'])

const storyStore = useStoryStore();
const { selectedStory, currentSectionIndex } = storeToRefs(storyStore);

const audio = ref(new Audio());
const isPlaying = ref(false)
const volume = ref(1);

const play = () => {
  audio.value.play()
  isPlaying.value = true
}

const pause = () => {
  audio.value.pause()
  isPlaying.value = false
}

const togglePlay = () => {
  isPlaying.value ? pause() : play()
}

const next = (): void => {
  currentSectionIndex.value = (currentSectionIndex.value + 1) % selectedStory.value.sections.length
  changeTrack()
}

const previous = (): void => {
  currentSectionIndex.value = (currentSectionIndex.value - 1 + selectedStory.value.sections.length) % selectedStory.value.sections.length
  changeTrack()
}

const changeTrack = async (): Promise<void> => {
  const newTrackUrl = await getAudioTrackUrl()
  audio.value.pause();
  audio.value = new Audio(audioUrl(newTrackUrl))
  audio.value.volume = volume.value
  if (isPlaying.value) {
    audio.value.play()
  }
}

const VolumeSliderPopover_Ref = ref();
const toggleVolumeSliderPopover = (event: MouseEvent) => {
  VolumeSliderPopover_Ref.value.toggle(event);
}

const setVolume = () => {
  audio.value.volume = volume.value / 100
}

const getAudioTrackUrl = async (): Promise<string> => {
  return await storyStore.fetchTextToSpeechForStory(
      selectedStory.value.id,
      selectedStory.value.sections[currentSectionIndex.value].id);
}

watch(currentSectionIndex, () => {
  changeTrack();
})

onMounted(async (): Promise<void> => {
  const firstSectionTextToSpeech = await getAudioTrackUrl();

  audio.value = new Audio(audioUrl(firstSectionTextToSpeech));
  audio.value.volume = volume.value
})

onUnmounted((): void => {
  audio.value.pause()
  audio.value = null
})
</script>

<style lang="scss">
.p-popover::before, .p-popover::after {
  display: none;
}
</style>