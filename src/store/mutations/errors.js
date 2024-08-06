export default {
  HANDLE_ERROR(state, message) {
    state.errors = message
  },
  CLEAN_ERROR(state) {
    state.errors = ''
  }
}