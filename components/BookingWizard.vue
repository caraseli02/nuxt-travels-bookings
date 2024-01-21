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
              form.travelId === travel.id
                ? 'border-primary dark:border-primary'
                : 'border-gray-200 dark:border-gray-700'
            "
            @click="form.travelId = travel.id"
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
            v-for="item in options"
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
import type { UIcon } from "#build/components";

const props = defineProps<{
  booking?: Booking;
}>();

const currentStep = ref(1);

const form = reactive<SimplifiedBooking>({
  travelId: "",
  customerInfo: { name: "", email: "", phoneNumber: "", age: 0, gender: "" },
  paymentType: "",
  notes: "",
});

const updateStep = (step: number) => {
  currentStep.value = step;
};

const emit = defineEmits(["save", "cancel"]);

const submit = async () => {
  // Form submission logic here
  if (currentStep.value === 3 && isFormDataValid.value) {
    await saveBooking();
  } else {
    updateStep(currentStep.value + 1);
  }
};

const saveBooking = async () => {
  try {
    // Construct the booking data object
    const bookingData = {
      travelId: form.travelId,
      customerInfo: form.customerInfo,
      paymentType: form.paymentType,
      notes: form.notes,
    };

    // Send a POST request to the server to save the booking
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Booking saved:", result);

    // Emit an event to notify the parent component that the booking has been saved
    emit("save", result);

    // Reset the form and close the modal
    resetForm();
    modelValue.value = false;
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
  emit("cancel");
};

const modelValue = defineModel<boolean>();

// Fetch travels from Nuxt server
const {
  data: travels,
  pending: loadingTravels,
  error: errorTravels,
  refresh: refreshTravels,
} = useAsyncData(() => {
  return $fetch("/api/travels");
});

const options = [
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
</script>

<style>
.booking-radio-group fieldset {
  display: flex !important;
  gap: 1.5rem;
}
/* Add Tailwind CSS styling here */
</style>
