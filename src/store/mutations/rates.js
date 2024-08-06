export default {
  SET_RATE(state, { key, value }) {
    state.rates[key] = value;
  },
  SET_NONCATLARGE(state, { key, value }) {
    state.nonCatLarge[key] = value;
  },
  SET_ALOP(state, { key, value }) {
    state.alopRates[key] = value;
  },
};
