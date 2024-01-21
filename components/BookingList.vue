<script setup lang="ts">
import type { Booking } from "../types"; // Import the Booking TypeScript interface

const emit = defineEmits<{
  edit: [val: Booking];
  delete: [id: string | number];
}>();

defineProps<{
  bookings: Booking[];
  loading: boolean;
}>();

const columns = [
  {
    key: "travelId",
    label: "Travel Id",
  },
  {
    key: "customerInfo",
    label: "Customer Info",
  },
  {
    key: "paymentType",
    label: "Payment Type",
  },
  {
    key: "notes",
    label: "Notes",
  },
  {
    key: "actions",
  },
];

const items = (row: Booking) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => emit("edit", row),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => emit("delete", row.id),
    },
  ],
];

const selected = ref([]);
</script>

<template>
  <UTable
    v-model="selected"
    :loading="loading"
    :rows="bookings"
    :columns="columns"
  >
    <template #travelName-data="{ row }">
      <span>{{ row.travelId }}</span>
    </template>
    <template #customerInfo-data="{ row }">
      <section class="flex flex-col gap-2">
        <p v-for="(val, key) in row.customerInfo" :key="key">
          {{ key }}: <span>{{ val }}</span>
        </p>
      </section>
    </template>
    <template #paymentType-data="{ row }">
      <span>{{ row.paymentType }}</span>
    </template>
    <template #notes-data="{ row }">
      <span>{{ row.notes }}</span>
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
  </UTable>
</template>
