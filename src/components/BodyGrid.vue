<template>
  <div className="grid grid-cols-2 grid-rows-2 gap-4">
    <div class="p-6 rounded-xl bg-[#2b3840]">
      <div class="text-sm mb-1">Uptime</div>
      <div class="text-2xl font-semibold mb-1">99.9%</div>
      <div class="text-green-500">+0.1%</div>
    </div>
    <div class="bg-[#2b3840] p-6 rounded-xl">
      <div class="text-sm mb-1">Response Time</div>
      <div class="text-2xl font-semibold mb-1">{{ endpoints[selectedEndpoint].responseTime }}ms</div>
      <div class="text-red-500">-10ms</div>
    </div>
    <div class="col-span-2 bg-[#2b3840] p-6 rounded-xl">
      <div class="text-sm mb-1">Incidents</div>
      <div class="text-2xl font-semibold mb-1">{{ endpoints[selectedEndpoint].incidents }}</div>
      <div class="text-red-500">-1</div>
    </div>
  </div>
</template>
<script setup>

import { useEndpointStore } from "../stores/useEndpointStore.js";
import { storeToRefs } from "pinia";


defineProps({
  a: Number,
});

const endpointStore = useEndpointStore();
const { endpoints, selectedEndpoint } = storeToRefs(endpointStore);

</script>