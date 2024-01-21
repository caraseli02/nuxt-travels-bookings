<template>
  <div class="container mx-auto p-4">
    <section class="flex justify-between items-center mb-16">
      <h1 class="text-2xl font-bold">Booking Management</h1>
      <UButton
        icon="i-heroicons-plus-20-solid"
        type="primary"
        size="xl"
        @click="showForm = true"
        >Add New Booking</UButton
      >
    </section>
    <!-- Error handling -->
    <div v-if="errorBookings" class="text-red-500">
      <p>Error fetching booking data: {{ errorBookings.message }}</p>
      <button class="mt-2 text-blue-500" @click="refreshBookings()">
        Retry
      </button>
    </div>
    <BookingList
      v-else
      :loading="loadingBookings"
      :bookings="bookings as Booking[]"
      @edit="editBooking"
      @delete="deleteBooking"
    />
    <BookingWizard
      v-if="showForm"
      v-model="showForm"
      :booking="currentBooking"
      @refresh="makeRefresh"
      @cancel="cancelEdit"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import type { Booking, SimplifiedBooking } from "../types"; // Import the Booking TypeScript interface
import { useAsyncData } from "#imports";

const showForm = ref(true);
const currentBooking = ref<Booking | null>(null);

const editBooking = (booking: Booking) => {
  showForm.value = true;
  currentBooking.value = { ...booking };
};

const deleteBooking = async (bookingId: string | number) => {
  // Handle booking deletion logic here
};

const cancelEdit = () => {
  showForm.value = false;
  currentBooking.value = null;
};

// Fetch bookings from Nuxt server
const {
  data: bookings,
  pending: loadingBookings,
  error: errorBookings,
  refresh: refreshBookings,
} = useAsyncData(() => {
  return $fetch("/api/bookings");
});

function onSubmit(booking: SimplifiedBooking) {
  // Handle booking form submission here
}

const makeRefresh = () => {
  showForm.value = false;
  refreshBookings();
};
</script>

<style scoped>
/* Add Tailwind CSS styling here */
</style>
