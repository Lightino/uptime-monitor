<template>
  <div class="grid gap-4 rounded-3xl border-1 border-[#372e56] bg-[#1f1837] text-white p-6 shadow-xl">
    <div>
      <h3 class="text-lg font-bold">{{ service.name }}</h3>
      <p class="text-sm text-gray-400">{{ service.url }}</p>
      <p class="text-xs text-gray-500 mt-1">
        Ultimo aggiornamento: {{ formatDate(service.updated_at) }}
      </p>
    </div>
    <div
      class="text-sm font-semibold px-3 py-1 rounded-full"
      :class="service.status ? 'bg-green-600' : 'bg-red-600'"
    >
      {{ service.status ? "Online" : "Offline" }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
});

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
