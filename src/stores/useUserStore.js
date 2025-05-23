import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  actions: {
    setUser(data) {
      this.user = data;
    },
  },
});
