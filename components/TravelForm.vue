<template>
  <UModal v-model="modelValue" :ui="{ width: 'sm:max-w-fit' }">
    <UCard>
      <template #header>
        <h2 class="text-lg font-bold mb-3">Travel Form</h2>
      </template>
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <section class="flex gap-4">
          <div class="flex flex-col gap-2">
            <UFormGroup label="Image" name="image">
              <UInput v-model="state.image" type="url" />
            </UFormGroup>
            <UFormGroup label="Name" name="name">
              <UInput v-model="state.name" />
            </UFormGroup>
          </div>

          <div class="flex flex-col gap-2">
            <UFormGroup label="Departure" name="departure">
              <UInput v-model="state.dates.departure" type="date" />
            </UFormGroup>
            <UFormGroup label="Return" name="return">
              <UInput v-model="state.dates.return" type="date" />
            </UFormGroup>
          </div>

          <UFormGroup label="Price" name="price">
            <UInput v-model="state.price" type="number" />
          </UFormGroup>

          <UFormGroup label="Description" name="description">
            <UTextarea v-model="state.description" type="textarea" />
          </UFormGroup>
        </section>
        <div class="flex justify-end">
          <UButton
            type="button"
            variant="link"
            class="mr-2"
            @click="emit('cancel', false)"
            >Cancel</UButton
          >
          <UButton type="submit"> Save </UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import type { Travel } from "../types"; // Import the Travel TypeScript interface

const props = defineProps<{
  travel?: Travel | null;
}>();
const defaultState = {
  image: "https://picsum.photos/100",
  name: "test",
  dates: {
    departure: "",
    return: "",
  },
  price: "1600",
  description: "test lorem ipsun ament haden",
};
const state = reactive(defaultState);

const emit = defineEmits<{
  submit: [travel: typeof state];
  cancel: [val: boolean];
  refresh: [val: boolean];
}>();

const modelValue = defineModel<boolean>();

onMounted(() => {
  if (props.travel?.id) {
    Object.assign(state, { ...props.travel });
  }
});

const validate = (state: Travel): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Name is required" });
  if (!state.dates.departure)
    errors.push({ path: "departure", message: "Departure date is required" });
  if (!state.dates.return)
    errors.push({ path: "return", message: "Return date is required" });
  if (!state.price)
    errors.push({ path: "price", message: "Price is required" });
  return errors;
};

function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  emit("submit", event.data);
}
</script>
