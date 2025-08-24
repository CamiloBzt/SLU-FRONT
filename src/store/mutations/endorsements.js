export default {
  setInsurancePolicy(state, { index, key, value }) {
    if (
      typeof index == 'undefined' ||
      typeof key == 'undefined' ||
      typeof value == 'undefined'
    )
      return;
    state.newInsurancePolicy[index][key] = value;
  },
  setStateCompleteNewInsurance(state, value) {
    state.newInsurancePolicy = value;
  },
  setIncreaseInsurableRisk(state, { index, key, value }) {
    if (
      typeof index == 'undefined' ||
      typeof key == 'undefined' ||
      typeof value == 'undefined'
    )
      return;
    state.increaseInsurableRisk[index][key] = value;
  },
  setStateCompleteInsurableRisk(state, value) {
    state.increaseInsurableRisk = value;
  },
  setReductionOfInsurableValue(state, { index, key, value }) {
    state.reductionOfInsurableValue[index][key] = value;
  },
  setStateCompleteReductionOfInsurableValue(state, value) {
    state.reductionOfInsurableValue = value;
  },
  setMovementWithoutPremium(state, { index, key, value }) {
    state.movementWithoutPremium[index][key] = value;
  },
  setStateCompleteMovementWithoutPremium(state, value) {
    state.movementWithoutPremium = value;
  },
  setChangeOfShare(state, { index, key, value }) {
    state.changeOfShare[index][key] = value;
  },
  setStateCompleteChangeOfShare(state, value) {
    state.changeOfShare = value;
  },
  setInternalAdjustment(state, { index, key, value }) {
    state.internalAdjustment[index][key] = value;
  },
  setStateCompleteInternalAdjustment(state, value) {
    state.internalAdjustment = value;
  },
  setEndorsementsSummary(state, { index, key, value }) {
    state.endorsementsSummary[index][key] = value;
  },
  setStateCompleteEndorsementsSummary(state, value) {
    state.endorsementsSummary = value;
  },
  setEndorsements(state, value) {
    state.endorsements = value;
  },
  updateEndorsement(state, { key, column, value }) {
    state.endorsements[key][column] = value;
  },
  setEndorsementDocuments(state, value) {
    state.endorsementsDocuments = value;
  },
  resetEndorsementDocuments(state) {
    state.endorsementsDocuments = [];
  },
};
