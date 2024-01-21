<script setup lang="ts">
import type { Travel } from "../types"; // Import the Travel TypeScript interface

const emit = defineEmits<{
  edit: [val: Travel];
  delete: [id: string | number];
}>();

defineProps<{
  travels: Travel[];
  loading: boolean;
}>();

const columns = [
  {
    key: "image",
  },
  {
    key: "name",
    label: "Travel Name",
  },
  {
    key: "dates",
    label: "Travel dates",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "averageRating",
    label: "Average Rating",
  },
  {
    key: "actions",
  },
];

const items = (row: Travel) => [
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
    :rows="travels"
    :columns="columns"
  >
    <template #name-data="{ row }">
      <span
        :class="[
          selected.find((item: Travel) => item.id === row.id) &&
            'text-primary-500 dark:text-primary-400',
        ]"
        >{{ row.name }}</span
      >
    </template>
    <template #image-data="{ row }">
      <img class="rounded-xl" :src="row.image" />
    </template>
    <template #dates-data="{ row }">
      <p class="flex flex-col">
        {{ formatDate(row.dates) }}
      </p>
    </template>
    <template #averageRating-data="{ row }">
      <div
        :style="{ width: ((row.averageRating - 1) / 4) * 80 + 20 + 'px' }"
        class="flex overflow-hidden"
      >
        <section class="w-[100px]">
          <UIcon
            v-for="item in 5"
            :key="item"
            name="i-heroicons-star-20-solid"
            class="w-5 h-5 text-yellow-600"
          />
        </section>
      </div>
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
