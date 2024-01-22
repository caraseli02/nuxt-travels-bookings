<template>
  <div class="flex">
    <UButton :disabled="currentStep === 1" label="Prev" @click="prevStep" />
    <ol
      class="items-center justify-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse"
    >
      <li
        v-for="step in steps"
        :key="step.number"
        :class="stepClass(step.number)"
      >
        <span
          class="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
        >
          {{ step.number }}
        </span>
        <span>
          <h3 class="font-medium leading-tight">{{ step.label }}</h3>
        </span>
      </li>
    </ol>
    <UButton :disabled="currentStep === 3" label="Next" @click="nextStep" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentStep: number;
}>();

const emit = defineEmits(["updateStep"]);

const steps = [
  { number: 1, label: "Travel Info" },
  { number: 2, label: "Customer Info" },
  { number: 3, label: "Payment Info" },
];

const stepClass = (stepNumber: number) => ({
  "flex items-center text-primary-600 dark:text-primary-500 space-x-2.5 rtl:space-x-reverse":
    stepNumber === props.currentStep,
  "flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse":
    stepNumber !== props.currentStep,
});

const nextStep = () => {
  if (props.currentStep < steps.length) {
    emit("updateStep", props.currentStep + 1);
  }
};

const prevStep = () => {
  if (props.currentStep > 1) {
    emit("updateStep", props.currentStep - 1);
  }
};
</script>

<style scoped></style>
