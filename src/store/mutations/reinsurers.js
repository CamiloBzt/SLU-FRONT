export default {
  setReinsurersList (state, list) {
    state.reinsurers = list
  },
  setReinsurerSelected(state, body) {
    state.reinsurersItem = {
      ...state.reinsurersItem,
      ...body,
    }
  },
}