import { defineStore } from "pinia";

export const useEndpointStore = defineStore("endpoint", {
  state: () => ({
    endpoints: [],
    selectedEndpoint: 0,
    access_token: null,
  }),
  actions: {
    setEndpoints(data) {
      this.endpoints = data;
    },
    setSelectedEndpoint(index) {
      this.selectedEndpoint = index;
    },
    setEndpointsArray(array) {
      this.endpoints = array;
    },
    async fetchEndpoints(auth0) {
      try {
        
        if(!this.access_token) {
          this.access_token = await auth0.getAccessTokenSilently({
            authorizationParams: {
              audience: "https://dev-9mvz0nf6.us.auth0.com/api/v2/",
            }
          });
        }

        await fetch(import.meta.env.VITE_APIURL + "/api/users/me", {
          headers: { Authorization: `Bearer ${this.access_token}` },
        });

        const res = await fetch(import.meta.env.VITE_APIURL +"/api/endpoints", {
          headers: { Authorization: `Bearer ${this.access_token}` },
        });
        const json = await res.json();
        this.setEndpoints(json);
      } catch (err) {
        console.error("Errore nel fetch:", err);
      }
    },
  },
});
