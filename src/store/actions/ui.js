const DEFAULT_DELAY = 5000
export default {
  addTemporalNotification ({ commit, state }, payload) {
    const now = new Date()
    commit('addNotification', { ...payload, datetime: now })
    const delay = payload.delay || DEFAULT_DELAY
    setTimeout(() => commit('deleteNotification', now), delay)
  },
}