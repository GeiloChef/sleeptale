<template>
  <div class="flex items-center gap-8 py-6 border-t-white border-t flex flex-row justify-center items-center">
    <div>
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

    <button id="test" @click="toggleVolumeSliderPopover">
      <Icon icon="volume-high" size="md" />
    </button>
    <Popover ref="VolumeSliderPopover_Ref">
      <Slider
          v-model="volume"
          orientation="vertical"
          @change="setVolume"
          class="h-48" />
    </Popover>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const tracks = [
  '2_25_de.mp3',
  '6_26_de.mp3',
  '6_27_de.mp3',
]

const currentTrackIndex = ref(0)
const audio = ref(new Audio(audioUrl(tracks[currentTrackIndex.value])))
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

const next = () => {
  currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.length
  changeTrack()
}

const previous = () => {
  currentTrackIndex.value = (currentTrackIndex.value - 1 + tracks.length) % tracks.length
  changeTrack()
}

const changeTrack = () => {
  audio.value.pause()
  audio.value = new Audio(audioUrl(tracks[currentTrackIndex.value]))
  audio.value.volume = volume.value
  if (isPlaying.value) {
    audio.value.play()
  }
}

const VolumeSliderPopover_Ref = ref();
const toggleVolumeSliderPopover = (event: MouseEvent) => {
  console.log(event)
  VolumeSliderPopover_Ref.value.toggle(event);
}

const setVolume = () => {
  audio.value.volume = volume.value
}

onMounted(() => {
  audio.value.volume = volume.value
})

onUnmounted(() => {
  audio.value.pause()
  audio.value = null
})
</script>

<style lang="scss">
.p-popover::before, .p-popover::after {
  display: none;
}
</style>