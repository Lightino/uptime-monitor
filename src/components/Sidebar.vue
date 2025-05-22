<template>
  <div>
    <button
      type="button"
      class="btn btn-text max-sm:btn-square "
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="default-sidebar"
      data-overlay="#default-sidebar"
    >
      <span class="icon-[tabler--menu-2] size-5"></span>
    </button>

    <aside
      id="default-sidebar"
      class="overlay [--auto-close:sm] sm:shadow-none overlay-open:translate-x-0 drawer drawer-start hidden max-w-64"
      role="dialog"
      tabindex="-1"
    >
      <div class="drawer-body px-2 pt-4">
        <div class="mb-2 text-xl font-medium">
            Monitored Server
        </div>
        <ul class="menu p-0">
          <li v-for="(element, index) in endpoints" :key="index" @click="selectElement(index)" data-overlay="#default-sidebar">
            <div class="flex items-center">
              <span class="icon-[tabler--cloud] size-5"></span>
              <span class="text-sm">{{ element.name }}</span>
              <span>{{ element.status? '🟢' : '🔴' }}</span>
            </div>
          </li>
          <div class="divider text-base-content/50 py-6 after:border-0">Add new server</div>
          <button class="btn btn-success">
            <span class="icon-[tabler--plus] size-4.5 shrink-0"></span>
            Add server
          </button>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup>

import { useEndpointStore } from "../stores/useEndpointStore.js";
import { storeToRefs } from "pinia";

const endpointStore = useEndpointStore();
const { endpoints } = storeToRefs(endpointStore);

const selectElement = (index) => {
    endpointStore.setSelectedEndpoint(index);
}

</script>
