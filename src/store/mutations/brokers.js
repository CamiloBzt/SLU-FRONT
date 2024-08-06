export default {
  SET_INFO_BROKER(state, {payload}) {
    state.brokers.selected = payload;
    console.log(payload)
  },
};
