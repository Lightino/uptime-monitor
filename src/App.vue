<template>
  <div class="container mx-auto">
    <NavBar />
    <div
      class="flex items-center justify-center min-h-screen px-4 md:px-6 py-12"
    >
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 w-full max-w-6xl"
      >
        <UptimeCard
          v-for="(element, index) in data"
          :key="index"
          :service="element"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UptimeCard from "./components/UptimeCard.vue";
import NavBar from "./components/NavBar.vue";

const data = ref([]);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/endpoints");
    data.value = await res.json();
  } catch (err) {
    console.error("Errore nel fetch:", err);
  }
});
</script>
