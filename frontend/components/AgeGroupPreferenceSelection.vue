<template>
  <div class="flex flex-col gap-2">
    <div class="px-4 flex flex-row gap-2 items-center">
      <span class="text-lg italic">
        {{ $t('age-group-preference') }}
      </span>
      <div @click="toggleAgeGroupDetails">
        <Icon icon="circle-info" />
      </div>
      <Popover ref="AgeGroupDetails_Ref">
          {{ $t('age-group-explanation') }}
      </Popover>
    </div>
    <Carousel
        :value="ageGroups"
        :numVisible="1"
        :numScroll="1"
        circular
        orientation="horizontal">
    <template #item="ageGroup">
      <div class="flex flex-col border border-white rounded-xl overflow-hidden">
        <Image
            :src="ageGroup.data.image"
            alt="Image" />
        <div class="flex flex-row px-3 py-2 justify-between items-center">
          <span>
            {{ ageGroup.data.name }}
          </span>
          <span>
            {{ ageGroup.data.ageRange }} {{ $t('jahre') }}
          </span>
        </div>
      </div>
    </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">

  import {AgeGroupTypes} from "@/types/Story.types";

  const {t} = useI18n();

  const ageGroups = ref([
    {
      id: AgeGroupTypes.Kids,
      name: t('age-groups.kids'),
      image: '/images/age-groups/kids.png',
      ageRange: '3 - 11'
    },
    {
      id: AgeGroupTypes.Teens,
      name: t('age-groups.teens'),
      image: '/images/age-groups/teens.png',
      ageRange: '11 - 17'
    },
    {
      id: AgeGroupTypes.Adults,
      name: t('age-groups.adults'),
      image: '/images/age-groups/adults.png',
      ageRange: '18 - 99'
    },
  ]);

  const AgeGroupDetails_Ref = ref();

  const toggleAgeGroupDetails = (event: MouseEvent) => {
    console.log(event);
    AgeGroupDetails_Ref.value.toggle(event);
  }
</script>
