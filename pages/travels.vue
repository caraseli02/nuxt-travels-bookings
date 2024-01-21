<template>
  <div class="container mx-auto p-4">
    <section class="flex justify-between items-center mb-16">
      <h1 class="text-2xl font-bold mb-4">Travel Management</h1>
      <UButton
        icon="i-heroicons-plus-20-solid"
        type="primary"
        size="xl"
        href="/travel-management/create"
        trailing
        @click="showForm = true"
        >Add New</UButton
      >
    </section>
    <!-- Error handling -->
    <div v-if="errorTravels" class="text-red-500">
      <p>Error fetching travel data: {{ errorTravels.message }}</p>
      <button class="mt-2 text-blue-500" @click="refreshTravels()">
        Retry
      </button>
    </div>
    <TravelList
      v-else
      :loading="loadingTravels"
      :travels="travels as Travel[]"
      @edit="editTravel"
      @delete="deleteTravel"
    />
    <TravelForm
      v-if="showForm"
      v-model="showForm"
      :travel="currentTravel"
      @refresh="makeRefresh"
      @cancel="cancelEdit"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import type { Travel, SimplifiedTravel } from "../types"; // Import the Travel TypeScript interface

const showForm = ref(false);
const currentTravel = ref<Travel | null>(null);

const editTravel = (travel: Travel) => {
  showForm.value = true;
  currentTravel.value = { ...travel };
};

const deleteTravel = async (travelId: string | number) => {
  try {
    const response = await fetch(`/api/travels/${travelId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    refreshTravels();
  } catch (error) {
    console.error("Failed to delete travel:", error);
  }
};

const cancelEdit = () => {
  showForm.value = false;
  currentTravel.value = null;
};

// Fetch travels from Nuxt server
const {
  data: travels,
  pending: loadingTravels,
  error: errorTravels,
  refresh: refreshTravels,
} = useAsyncData(() => {
  return $fetch("/api/travels");
});

function onSubmit(travel: SimplifiedTravel) {
  const method = currentTravel.value ? "PUT" : "POST";
  const url = currentTravel.value
    ? `/api/travels/${currentTravel.value?.id}`
    : "/api/travels";
  useFetch(url, { method, body: travel })
    .then(() => {
      // Emit save event after successful POST/PUT request
      currentTravel.value = null;
      makeRefresh();
    })
    .catch((error) => {
      console.error("Error saving travel:", error);
    });
}

const makeRefresh = () => {
  showForm.value = false;
  refreshTravels();
};
</script>

<style scoped>
/* Add Tailwind CSS styling here */
</style>
