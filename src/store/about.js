import { getAbout } from "@/api/about";
export default {
  namespaced: true,
  state: {
    isLoading: false,
    remoteData:""
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
    async fetchAbout(ctx) {
      if (ctx.state.remoteData) {
        return
      }
      ctx.commit("setIsLoading", true)
      const res = await getAbout()
      ctx.commit("setRemoteData", res)
      ctx.commit("setIsLoading", false)
    }
  }
}