<template>
  <div>
    <!-- Toggle Sidebar -->
    <button
      type="button"
      class="btn btn-text max-sm:btn-square"
      @click="sidebarOpen = !sidebarOpen"
    >
      <span class="icon-[tabler--menu-2] size-5"></span>
    </button>

    <!-- Sidebar -->
    <div v-show="sidebarOpen" class="fixed inset-0 z-30 flex">
      <Transition
        name="slide"
        enter-active-class="transition-transform duration-300 ease-out"
        leave-active-class="transition-transform duration-200 ease-in"
        enter-from-class="-translate-x-64"
        enter-to-class="translate-x-0"
        leave-from-class="-translate-x-64"
        leave-to-class="translate-x-0"
      >
        <aside
          v-if="sidebarOpen"
          ref="sidebarRef"
          class="w-64 h-full bg-base-100 shadow-md p-4 pt-6 z-40"
          role="dialog"
        >
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-medium">Monitored Server</h2>
          </div>
          <ul class="menu p-0">
            <li
              v-for="(element, index) in endpoints"
              :key="index"
              @click="
                selectElement(index);
                sidebarOpen = false;
              "
            >
              <div class="flex items-center gap-2">
                <span class="icon-[tabler--cloud] size-5"></span>
                <span class="text-sm">{{ element.name }}</span>
                <span>{{ element.status ? "🟢" : "🔴" }}</span>
              </div>
            </li>
            <div class="divider text-base-content/50 py-6 after:border-0">
              Add new server
            </div>
            <button class="btn btn-success" @click="modalOpen = true">
              <span class="icon-[tabler--plus] size-4.5 shrink-0"></span>
              Add server
            </button>
          </ul>
        </aside>
      </Transition>

      <div class="flex-1" @click="handleClickOutsideSidebar"></div>
    </div>
  </div>

  <!-- Modal -->
  <div
    v-if="modalOpen"
    class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
    role="dialog"
  >
    <div class="bg-base-100 p-6 rounded-lg w-full max-w-lg shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold flex items-center gap-2">
          <span class="icon-[tabler--server-spark]"></span>
          Add new server
        </h3>
        <button
          @click="modalOpen = false"
          class="btn btn-text btn-circle btn-sm"
        >
          <span class="icon-[tabler--x] size-4"></span>
        </button>
      </div>

      <div class="mb-4">
        <label class="label" for="serverName">Server name</label>
        <input
          type="text"
          class="input w-full"
          id="serverName"
          v-model="serverName"
          placeholder="Google"
        />
      </div>

      <div class="mb-4">
        <label class="label" for="serverUrl">URL</label>
        <input
          type="text"
          class="input w-full"
          id="serverUrl"
          v-model="serverUrl"
          placeholder="https://google.com"
        />
      </div>

      <div class="modal-footer flex justify-end gap-2">
        <button class="btn btn-secondary btn-soft" @click="modalOpen = false">
          Close
        </button>
        <button class="btn btn-primary" @click="addServer">Save changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useEndpointStore } from "../stores/useEndpointStore.js";
import { storeToRefs } from "pinia";

const sidebarRef = ref(null);

const handleClickOutsideSidebar = (event) => {
  if (sidebarRef.value && !sidebarRef.value.contains(event.target)) {
    sidebarOpen.value = false;
  }
};

const endpointStore = useEndpointStore();
const { endpoints, access_token } = storeToRefs(endpointStore);

const serverName = ref("");
const serverUrl = ref("");

const sidebarOpen = ref(false);
const modalOpen = ref(false);

const selectElement = (index) => {
  endpointStore.setSelectedEndpoint(index);
};

const addServer = async () => {
  const payload = {
    name: serverName.value,
    url: serverUrl.value,
  };

  try {

    const res = await fetch(import.meta.env.VITE_APIURL + "/api/endpoints/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${endpointStore.access_token}`,
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

    modalOpen.value = false;
  } catch (err) {
    console.error("Error: ", err);
  }
};
</script>
