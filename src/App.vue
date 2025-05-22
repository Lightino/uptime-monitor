<template>
  <div class="container mx-auto">
    <Navbar class="mb-4" />

    <div v-if="endpoints.length" class="m-4 text-2xl flex items-center gap-2">
      {{ endpoints[selectedEndpoint].name }}
      <span
        class="badge rounded-full"
        :class="endpoints[selectedEndpoint].status ? 'badge-success' : 'badge-error'"
      >
        {{ endpoints[selectedEndpoint].status ? 'Online' : 'Offline' }}
      </span>
    </div>

    <template v-if="endpoints.length">
      <Tabs />
      <Services />
    </template>

    <div v-else class="m-4 text-base-content/50">Caricamento dati...</div>
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

onMounted(() => {
  endpointStore.fetchEndpoints();
});
</script>
