export default {
  sumDeductions: (state) => {
    const op =
        (!state.deductions.brokerage
          ? 0
          : parseFloat(state.deductions.brokerage)) +
        (!state.deductions.fronting ? 0 : parseFloat(state.deductions.fronting)) +
        (!state.deductions.eng ? 0 : parseFloat(state.deductions.eng)) +
        (!state.deductions.taxes ? 0 : parseFloat(state.deductions.taxes)) +
        (!state.deductions.lta ? 0 : parseFloat(state.deductions.lta)) +
        (!state.deductions.others ? 0 : parseFloat(state.deductions.others));
    return op.toFixed(2);;
  },
  
};
