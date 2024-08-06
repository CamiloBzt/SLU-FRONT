export default {
  commitLayers(state, value) {
    state.layersArray = value;
  },
  resetLayers(state) {
    state.layersArray = [
      {
        id: 1,
        layer: 'Layer 1',
        limit: '',
        excess: '',
        deductions: '',
        sluShare: '',
        premium: '',
        sluLimit: '',
        sluPremium: '',
        checked: false,
        limitUSD: '',
        excessUSD: '',
        premiumUSD: '',
        sluLimitUSD: '',
        sluPremiumUSD: '',
      },
    ];
  },
};
