<template>
  <div>
    <button
      type="button"
      class="btn btn-text max-sm:btn-square"
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
        <div class="mb-2 text-xl font-medium">Monitored Server</div>
        <ul class="menu p-0">
          <li
            v-for="(element, index) in endpoints"
            :key="index"
            @click="selectElement(index)"
            data-overlay="#default-sidebar"
          >
            <div class="flex items-center">
              <span class="icon-[tabler--cloud] size-5"></span>
              <span class="text-sm">{{ element.name }}</span>
              <span>{{ element.status ? "🟢" : "🔴" }}</span>
            </div>
          </li>
          <div class="divider text-base-content/50 py-6 after:border-0">
            Add new server
          </div>
          <button
            class="btn btn-success"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="fullscreen-modal"
            data-overlay="#fullscreen-modal"
          >
            <span class="icon-[tabler--plus] size-4.5 shrink-0"></span>
            Add server
          </button>
        </ul>
      </div>
    </aside>
  </div>

  <div
    id="fullscreen-modal"
    class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden"
    role="dialog"
    tabindex="-1"
  >
    <div
      class="modal-dialog overlay-open:opacity-100 overlay-open:duration-300 max-w-none"
    >
      <div class="modal-content justify-between">
        <div class="modal-header">
          <h3 class="modal-title flex items-center space-between">
            <span class="icon-[tabler--server-spark]"></span>&nbsp;&nbsp;Add new
            server
          </h3>
          <button
            type="button"
            class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
            aria-label="Close"
            data-overlay="#fullscreen-modal"
          >
            <span class="icon-[tabler--x] size-4"></span>
          </button>
        </div>
        <div class="modal-body grow">
          <div class="input-floating mb-4">
            <input
              type="text"
              placeholder="Google"
              class="input"
              id="serverName"
              v-model="serverName"
            />
            <label class="input-floating-label" for="serverName"
              >Server name</label
            >
          </div>

          <div class="input-floating mb-4">
            <input
              type="text"
              placeholder="https://google.com"
              class="input"
              id="serverUrl"
              v-model="serverUrl"
            />
            <label class="input-floating-label" for="serverUrl">URL</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-soft btn-secondary"
            data-overlay="#fullscreen-modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="addServer">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useEndpointStore } from "../stores/useEndpointStore.js";
import { storeToRefs } from "pinia";

const endpointStore = useEndpointStore();
const { endpoints } = storeToRefs(endpointStore);

const serverName = ref("");
const serverUrl = ref("");

const selectElement = (index) => {
  endpointStore.setSelectedEndpoint(index);
};

const addServer = async () => {
  const payload = {
    name: serverName.value,
    url: serverUrl.value,
  };

  try {
    const res = await fetch("http://localhost:3000/api/endpoints/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Errore nella richiesta");
    }

    const data = await res.json();

    endpointStore.fetchEndpoints?.();
    serverName.value = "";
    serverUrl.value = "";

    // Close modal
    document.querySelector('[data-overlay="#fullscreen-modal"]')?.click();
  } catch (err) {
    console.error("Error: ", err);
  }
};
</script>
