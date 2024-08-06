
export default {
  setClaimInformation(state, payload) {
    state.claims.list= [].concat(payload)
  },
  setSelectedBound(state, item) {
    state.claims.selected = item
  },
  SET_CLAIMS_LIST(state, {payload}) {
    state.claims.listTable = payload
  },
  SET_CLAIM_CREATED(state, payload) {
    state.claims.selected = {
      ...state.claims.selected,
      ...payload
    }
  },
  setClaimsHistory(state, payload) {
    state.claims.table.list = JSON.parse(payload);
  },
  setClaimsHistoryPagination(state, payload) {
    state.claims.table.limit = payload.limit;
    state.claims.table.offset = payload.offset;
    state.claims.table.query = payload.query;
    state.claims.table.filter = payload.filter;
    state.claims.table.filterSearch = payload.filterSearch;
  },
};
