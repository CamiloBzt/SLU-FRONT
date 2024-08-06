export default {
  SET_TO_BE_DEFINED(
    state,
    {
      limitSluUsd,
      premiumSluUsd,
      limitedInsuredUsd,
      limitSlu,
      sluShare,
      premiumSlu,
      limitedInsured,
    }
  ) {
    state.toBeDefined = {
      USD: {
        limitSlu: limitSluUsd,
        premiumSlu: premiumSluUsd,
        limitedInsured: limitedInsuredUsd,
      },
      original: {
        limitSlu,
        sluShare,
        premiumSlu,
        limitedInsured,
      },
    };
  },
};
