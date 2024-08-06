export default {
  SET_CONTACTS(state, payload) {
    state.contacts = payload;
  },
  RESET_CONTACTS(state) {
    state.contacts = [];
  },
};
