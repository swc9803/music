import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    isOpened: false,
    userData: null,
    count: 0,
  }),
  actions: {},
});
