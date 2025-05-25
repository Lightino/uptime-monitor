<template>
  <div class="w-full animate-fade-up">
    <label class="label-text" for="textareaLabel">Your notes</label>
    <textarea
      class="textarea h-72"
      placeholder="Lorem ipsum"
      id="textareaLabel"
      v-model="note"
    ></textarea>
  </div>
</template>

<script>
import { useEndpointStore } from "../stores/useEndpointStore";

export default {
  data() {
    return {
      note: "",
      debounceTimer: null
    };
  },
  created() {
    this.endpointStore = useEndpointStore();
    const selected = this.endpointStore.selectedEndpoint;
    this.note = this.endpointStore.endpoints[selected].notes;
  },
  watch: {
    note(newVal) {
      const selected = this.endpointStore.selectedEndpoint;
      this.endpointStore.endpoints[selected].notes = newVal;

      const id = this.endpointStore.endpoints[selected].id;

      const access_token = this.endpointStore.access_token;

      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        fetch(`${import.meta.env.VITE_APIURL}/api/endpoints/${id}/note`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
           },
          body: JSON.stringify({
            notes: newVal
          }),
        });
      }, 500);
    }
  }
};
</script>
