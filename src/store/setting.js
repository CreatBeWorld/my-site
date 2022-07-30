import { getSetting } from "../api/setting";
import { titleController } from "@/utils";
export default {
  namespaced: true,
  state: {
    isLoading: false,
    remoteData: null
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload
    },
    setRemoteData(state, payload) {
      state.remoteData = payload
    }
  },
  actions: {
    async getSetting(ctx) {
      ctx.commit("setIsLoading", true);
      const res = await getSetting();
      ctx.commit("setRemoteData", res);
      ctx.commit("setIsLoading", false);
      if (document.querySelector("link[rel='shortcut icon']")) {
        return;
      } else {
        const link = document.createElement("link");
        link.rel = "shortcut icon"
        link.type = "image/x-icon"
        link.href = res.favicon
        document.querySelector("head").appendChild(link)
      }
      if (res.siteTitle) {
        titleController.setSiteTitle(res.siteTitle)
      }
    }
  },
}