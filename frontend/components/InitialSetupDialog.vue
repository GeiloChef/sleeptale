<template>
  <Dialog
    v-model:visible="visible"
    modal
    class="w-full"
    :closable="false"
    :header="$t('initial-setup.headline')">
    <Stepper
      v-model:value="activeStep"
      linear>
      <StepList class="flex flex-row justify-center items-center">
        <Step
          v-slot="{ activateCallback, value, a11yAttrs }"
          asChild
          :value="1">
          <div
            class="flex flex-row flex-auto gap-2"
            v-bind="a11yAttrs.root">
            <button
              class="bg-transparent border-0 inline-flex flex-col gap-2"
              @click="activateCallback"
              v-bind="a11yAttrs.header">
              <span
                :class="[
                  'step-icon',
                  {
                    'done-step': value < activeStep,
                    'active-step': value === activeStep,
                    'not-done-step': value > activeStep
                  }
                ]"
              >
              <Icon icon="language"></Icon>
              </span>
            </button>
          </div>
        </Step>

        <Divider />

        <Step
          v-slot="{ activateCallback, value, a11yAttrs }"
          asChild
          :value="2">
          <div
            class="flex flex-row flex-auto gap-2"
            v-bind="a11yAttrs.root">
            <button
              class="bg-transparent border-0 inline-flex flex-col gap-2"
              @click="activateCallback"
              v-bind="a11yAttrs.header">
              <span
                :class="[
                'step-icon',
                {
                  'done-step': value < activeStep,
                  'active-step': value === activeStep,
                  'not-done-step': value > activeStep
                }
              ]"
              >
              <Icon icon="book"></Icon>
              </span>
            </button>
          </div>
        </Step>

      </StepList>
      <StepPanels>
        <StepPanel
          v-slot="{ activateCallback }"
          :value="1">
          <div class="flex flex-col gap-4">
            <span class="italic">
              {{ $t('initial-setup.language-selection') }}
            </span>
            <LanguageSelect />
          </div>

          <div class="flex pt-6 justify-end">
            <Button
              :label="$t('next-step')"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="activateCallback(2)" />
          </div>
        </StepPanel>

        <StepPanel
          v-slot="{ activateCallback }"
          :value="2">
          <div class="flex flex-col gap-4">
            <span class="italic">
              {{ $t('initial-setup.age-group-selection') }}
            </span>
            <AgeGroupPreferenceSelection />
          </div>

          <div class="flex pt-6 justify-end">
            <Button
              :label="$t('let-s-go')"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="finishInitialSetup" />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>

  </Dialog>
</template>

<script setup lang="ts">
  import {useUserStore} from "@/.nuxt/imports";

  const visible = ref(false);
  const activeStep = ref(1);

  const userInfoStore = useUserStore();
  const { user } = storeToRefs(userInfoStore);

  const finishInitialSetup = (): void => {
    visible.value = false;
    user.value.finishInitialSetup();
  }

  onMounted(() => {
    if (!user.value.hasInitialSetupFinished()) {
      visible.value = true;
    }
  })
</script>

<style lang="scss">
.step-icon {
  @apply rounded-full border-2 w-10 h-10 inline-flex items-center justify-center
}

.done-step {
  @apply text-green-500 border-green-500
}

.active-step {
  @apply text-white border-white
}

.not-done-step {
  @apply border-gray-600 text-gray-500
}
</style>