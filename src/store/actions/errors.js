export default {
  async handleErrorMessage({ commit }, message) {
    commit('HANDLE_ERROR', message)
  },
}