<template>
  <UModal v-model="modelValue" :ui="{ width: 'sm:min-w-[80vw]' }">
    <UCard>
      <template #header>
        <Stepper
          :currentStep="currentStep"
          @updateStep="currentStep = $event"
        />
      </template>

      <!-- Step 1: Select Travel -->
      <section v-if="currentStep === 1" class="flex gap-4">
        <section class="flex gap-4">
          <div
            v-for="travel in travels"
            :key="travel.id"
            class="min-w-[250px] border hover:border-primary hover:dark:border-primary rounded-lg shadow cursor-pointer"
            :class="
              Number(form.travelId) === travel.id
                ? 'border-primary dark:border-primary'
                : 'border-gray-200 dark:border-gray-700'
            "
            @click="onTravelClick(String(travel.id))"
          >
            <img
              :src="travel.image"
              class="rounded-t-lg w-full max-h-[150px] object-cover aspect-square"
              alt=""
            />
            <div class="p-5">
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate"
              >
                {{ travel.name }}
              </h5>
              <p class="mb-4 text-gray-700 dark:text-gray-400 text-md">
                {{ travel.price }} $
              </p>
            </div>
          </div>
        </section>
      </section>

      <!-- Step 2: Customer Info -->
      <section v-if="currentStep === 2" class="flex justify-center gap-4">
        <UForm :state="form.customerInfo" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <UFormGroup label="Name" name="name">
              <UInput v-model="form.customerInfo.name" />
            </UFormGroup>
            <UFormGroup label="Email" name="email">
              <UInput v-model="form.customerInfo.email" type="email" />
            </UFormGroup>
            <UFormGroup label="Phone Number" name="phoneNumber">
              <UInput v-model="form.customerInfo.phoneNumber" />
            </UFormGroup>
            <UFormGroup label="Age" name="age">
              <UInput v-model="form.customerInfo.age" type="number" />
            </UFormGroup>
            <UFormGroup label="Gender" name="gender">
              <UInput v-model="form.customerInfo.gender" />
            </UFormGroup>
          </div>
        </UForm>
      </section>

      <!-- Step 3: Payment Info -->
      <section v-if="currentStep === 3" class="flex flex-col gap-4 mb-4">
        <section class="flex gap-4">
          <button
            v-for="item in paymentOptions"
            :key="item.label"
            :class="
              item.value === form.paymentType
                ? 'border-primary'
                : 'border-gray-600'
            "
            class="justify-center items-stretch bg-transparent flex w-[328px] flex-col px-4 py-7 rounded-lg border-2 border-solid cursor-pointer hover:border-primary"
            @click="form.paymentType = item.value"
          >
            <span class="flex justify-between items-center gap-5"
              ><div class="text-xl">{{ item.label }}</div>
              <UIcon
                v-if="item.value === form.paymentType"
                class="w-5 h-5 text-primary"
                name="i-heroicons-check-circle-20-solid"
              />
            </span>
          </button>
        </section>

        <UFormGroup label="Notes" name="notes">
          <UTextarea v-model="form.notes" type="textarea" />
        </UFormGroup>
      </section>

      <!-- Form submission and cancel buttons -->
      <div class="flex justify-end">
        <UButton type="button" variant="link" class="mr-2" @click="cancel"
          >Cancel</UButton
        >
        <UButton
          v-if="currentStep === 3 && isFormDataValid"
          type="button"
          @click="submit"
          >Save</UButton
        >
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { Booking } from "../types"; // Import the Booking TypeScript interface

const props = defineProps<{
  booking?: Booking;
}>();

const currentStep = ref(1);

const form = reactive({
  travelId: "",
  customerInfo: {
    name: "test edit",
    email: "test@example.com",
    phoneNumber: "6655874125",
    age: 20,
    gender: "Male",
  },
  paymentType: "",
  notes: "",
});

const updateStep = (step: number) => {
  currentStep.value = step;
};

const emit = defineEmits<{
  submit: [travel: typeof form];
  cancel: [val: boolean];
  refresh: [val: boolean];
}>();

const submit = async () => {
  // Form submission logic here
  if (currentStep.value === 3 && isFormDataValid.value) {
    await saveBooking();
  } else {
    updateStep(currentStep.value + 1);
  }
};

const saveBooking = () => {
  try {
    // Construct the booking data object
    const bookingData = {
      travelId: form.travelId,
      customerInfo: form.customerInfo,
      paymentType: form.paymentType,
      notes: form.notes,
    };

    // Emit an event to notify the parent component that the booking has been saved
    emit("submit", bookingData);

    // Reset the form and close the modal
    resetForm();
  } catch (error) {
    console.error("Failed to save booking:", error);
    // Handle the error (e.g., show an error message to the user)
  }
};

const resetForm = () => {
  // Reset the form fields to their initial values
  form.travelId = "";
  form.customerInfo = {
    name: "",
    email: "",
    phoneNumber: "",
    age: 0,
    gender: "",
  };
  form.paymentType = "";
  form.notes = "";
};

const cancel = () => {
  emit("cancel", true);
};

const modelValue = defineModel<boolean>();

// Fetch travels from Nuxt server
const { data: travels } = useAsyncData(() => {
  return $fetch("/api/travels");
});

const paymentOptions = [
  {
    value: "transfer",
    label: "Credit transfer",
  },
  {
    value: "paypal",
    label: "Paypal",
  },
  {
    value: "revolut",
    label: "Revolut",
  },
];

const isFormDataValid = computed(() => {
  // Implement validation logic for each step
  if (currentStep.value === 1) return form.travelId !== "";
  if (currentStep.value === 2) return validateCustomerInfo(form.customerInfo);
  if (currentStep.value === 3) return validatePaymentInfo(form.paymentType);
  return true; // Placeholder, replace with actual validation
});

const onTravelClick = (travelId: string) => {
  form.travelId = travelId;
  updateStep(currentStep.value + 1);
};

onMounted(() => {
  if (props.booking?.id) {
    Object.assign(form, { ...props.booking });
  }
});
</script>
