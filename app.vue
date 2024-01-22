<template>
  <main>
    <nav class="flex gap-4 justify-center mt-4">
      <NuxtLink to="travels"
        ><UButton :disabled="route.name === 'travels'" variant="link">
          Travels
        </UButton>
      </NuxtLink>
      <NuxtLink to="bookings">
        <UButton :disabled="route.name === 'bookings'" variant="link">
          Bookings
        </UButton>
      </NuxtLink>
    </nav>
    <div class="p-8">
      <NuxtPage />
    </div>
  </main>
</template>

<script setup lang="ts">
const rounter = useRouter();
const route = useRoute();
if (route.path === "/") rounter.push("/travels");
</script>

<style scoped></style>
