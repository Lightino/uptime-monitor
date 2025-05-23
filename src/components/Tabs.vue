<template>
  <nav
    class="tabs tabs-bordered px-4 animate-fade-up"
    aria-label="Tabs"
    role="tablist"
    aria-orientation="horizontal"
  >
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      class="tab w-full"
      :class="{ 'tab-active': tab.id === activeTab }"
      :id="`tab-${tab.id}`"
      :aria-controls="`panel-${tab.id}`"
      role="tab"
      :aria-selected="tab.id === activeTab"
      @click="activeTab = tab.id"
    >
      {{ tab.label }}
    </button>
  </nav>

  <div class="mt-3 mx-4">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      :id="`panel-${tab.id}`"
      class="transition-all duration-200"
      role="tabpanel"
      :aria-labelledby="`tab-${tab.id}`"
      v-show="tab.id === activeTab"
    >
      <BodyGrid v-if="tab.a == 1" />
      <Chart v-if="tab.a == 2" :latestResponseMs="endpoints[selectedEndpoint].responseTime" :key="endpoints[selectedEndpoint]" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BodyGrid from './BodyGrid.vue'
import Chart from './Chart.vue'

import { useEndpointStore } from "../stores/useEndpointStore.js";
import { storeToRefs } from "pinia";

const endpointStore = useEndpointStore();
const { endpoints, selectedEndpoint } = storeToRefs(endpointStore);

const activeTab = ref('home')

const tabs = [
  {
    id: 'home',
    label: 'Home',
    a: 1,
  },
  {
    id: 'charts',
    label: 'Charts',
    a: 2,
  },
  {
    id: 'notes',
    label: 'Notes',
    a: 3,
  },
]
</script>
