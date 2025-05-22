import { defineStore } from "pinia";

export const useEndpointStore = defineStore("endpoint", {
  state: () => ({
    endpoints: [],
    selectedEndpoint: 0,
  }),
  actions: {
    setEndpoints(data) {
      this.endpoints = data;
    },
    setSelectedEndpoint(index) {
      this.selectedEndpoint = index;
    },
    async fetchEndpoints() {
      try {
        const res = await fetch("http://localhost:3000/api/endpoints");
        const json = await res.json();
        this.setEndpoints(json);
      } catch (err) {
        console.error("Errore nel fetch:", err);
      }
    },
  },
});
