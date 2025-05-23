<template>
  <div class="animate-fade-up">
    <div>
      <div class="text-xl mx-4 mt-8 font-semibold">Services</div>
      <div class="card w-96">
        <ul class="space-y-0.5">
          <li
            class="flex items-center gap-2 px-4 py-2.5"
            v-for="(service, index) in services"
            :key="index"
          >
            <div class="bg-[#2b3840] rounded-lg p-3">
              <span
                class="size-5 flex items-center"
                :class="service.icon"
              ></span>
            </div>
            <div class="flex grow items-center justify-between gap-y-1">
              <div>
                <h6 class="text-white">{{ service.type }}</h6>
                <div class="text-base-content/80 text-xs" :class="service.status == 'Online'? 'text-green-500' : 'text-red-500'">
                  {{ service.status }}
                </div>
              </div>
              <div class="flex flex-col items-end gap-x-2 gap-y-0.5">
                <span>{{ service.ms }}ms</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useEndpointStore } from "../../stores/useEndpointStore.js";
import { storeToRefs } from "pinia";

const endpointStore = useEndpointStore();
const { endpoints, selectedEndpoint } = storeToRefs(endpointStore);

const services = computed(() => {
  const current = endpoints.value[selectedEndpoint.value] || {};

  return [
    {
      type: "Website",
      status: current.website > 0? "Online" : "Offline",
      ms: current.website ?? "-",
      icon: "icon-[tabler--world]",
    },
    {
      type: "API",
      status: current.api > 0? "Online" : "Offline",
      ms: current.api ?? "-",
      icon: "icon-[tabler--code]",
    },
  ];
});
</script>
