<template>
  <div class="container mx-auto">
    <Navbar class="mb-4" />

    <div v-if="endpoints.length" class="mx-4 text-2xl flex items-center gap-2">
      {{ endpoints[selectedEndpoint].name }}
      <span
        class="badge rounded-full"
        :class="
          endpoints[selectedEndpoint].status ? 'badge-success' : 'badge-error'
        "
      >
        {{ endpoints[selectedEndpoint].status ? "Online" : "Offline" }}
      </span>
    </div>

    <div v-if="endpoints.length" class="mx-4 mb-4 text-xs text-gray-500">
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
