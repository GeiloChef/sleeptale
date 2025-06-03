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
        ref="AgeGroupCarousel_Ref"
        :page="currentPage"
        :value="ageGroups"
        :numVisible="1"
        :numScroll="1"
        circular
        orientation="horizontal"
        @update:page="setNewUserGroup">
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
            {{ ageGroup.data.ageRange }} {{ $t('year') }}
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

  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  const currentPage = ref(0);

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

  const setNewUserGroup = (index: number): void => {
    console.log(index)
    user.value.setUserAgeGroup(ageGroups.value[index].id);
  }

  const AgeGroupCarousel_Ref = ref();

  onMounted((): void => {
    if (user.value.getUserAgeGroup()) {
      currentPage.value = ageGroups.value.findIndex(group => group.id === user.value.getUserAgeGroup());
    }
  });
</script>
