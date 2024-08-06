/* libs */
import DecimalClass from 'decimal.js';

/**
 *   configuraciones globales para los cálculos con decimal/js 
 */
export default DecimalClass.set({
  precision: 30,
  rounding: DecimalClass.ROUND_HALF_UP,
  toExpNeg: -10,
  toExpPos: 10,
  LN10: 2.3025850929940456840179914546844,
  LOG10E: 0.4342944819032518276511289189166,
  debug: true,
  maxE:9e15,
  minE:-9e15,
});