<template>
  <div class="container mx-auto">
    <Navbar class="mb-4" />

    <div v-if="endpoints.length" class="mx-4 text-2xl flex items-center gap-2 animate-fade-up">
      {{ endpoints[selectedEndpoint].name }}
      <span class="relative flex size-3">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" :class="endpoints[selectedEndpoint].status ? 'bg-green-400' : 'bg-red-400'"></span>
        <span class="relative inline-flex size-3 rounded-full" :class="endpoints[selectedEndpoint].status ? 'bg-green-500' : 'bg-red-500'"></span>
      </span>
    </div>

    <div v-if="endpoints.length" class="mx-4 mb-4 text-xs text-gray-500 animate-fade-up">
      {{ endpoints[selectedEndpoint].url }}
    </div>

    <template v-if="endpoints.length">
      <Tabs />
      <Services />
    </template>

    <div v-else class="m-4 text-base-content/50">Loading...</div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Tabs from "./components/Tabs.vue";
import Services from "./components/subcomponents/Services.vue";
import { onMounted } from "vue";
import { useEndpointStore } from "./stores/useEndpointStore.js";
import { storeToRefs } from "pinia";


const endpointStore = useEndpointStore();
const { endpoints, selectedEndpoint } = storeToRefs(endpointStore);

const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.type === "update") {
    endpointStore.setEndpointsArray(message.data);
  }
});

onMounted(() => {
  endpointStore.fetchEndpoints();
});
</script>
