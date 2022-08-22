import { getProject } from "@/api/project";
export default {
  namespaced: true,
  state: {
    isLoading: false,
    remoteData:[],
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
    async fetchProject(ctx) {
      if (ctx.state.remoteData.length > 0) {
        return
      }
      ctx.commit("setIsLoading", true)
      let res = await getProject()
      ctx.commit("setRemoteData", res)
      ctx.commit("setIsLoading", false)
    }
  }
}