/* libs */
import Decimal from "@/lib/decimal";
import numeral from "numeral";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/**
 * function para calcular el slu share de cualquier apartado requeridor requerido
 * @param {number} sluLine
 * @param {number} value
 * @returns {number} op
 */

export const sluShare = (sluLine, value) => {
  const percentage = Decimal.div(sluLine, 100);

  const op = Decimal.mul(numeral((`${percentage}` || "$0").replace(/[^0-9.]/g, "")).value() || 0, numeral((`${value}` || "$0").replace(/[^0-9.]/g, "")).value() || 0).toNumber();

  return op || 0;
};

/**
 * función para calcular la diferentes propriedades del un net premium
 * @param {number} property
 * @param {number} sluShare
 * @returns {number} op
 */

export const calculateProperty = (property = 0, sluShare = 0) => {
  try {
    const safeProperty = property == null || isNaN(property) ? 0 : property;
    const safeSluShare = sluShare == null || isNaN(sluShare) ? 0 : sluShare;

    const percentage = new Decimal(safeProperty).div(100);

    const cleanPercentage = numeral(`${percentage}`.replace(/[^0-9.]/g, "")).value() || 0;
    const cleanSluShare = numeral(`${safeSluShare}`.replace(/[^0-9.]/g, "")).value() || 0;

    const op = new Decimal(cleanPercentage).mul(cleanSluShare).toNumber();

    return op || 0;
  } catch (e) {
    console.warn("Error in calculateProperty:", e.message);
    return 0;
  }
};

/**
 *  resultado de calculateTotal
 *  @typedef {object} Result
 *  @property {number} result
 *  @property {string} format
 */

/**
 * hacer la suma de la propiedades mandadas y regresa el valor formateado y el numérico
 * @param  {...number} properties
 * @returns  {Result}
 */

export const calculateTotal = (...properties) => {
  const sum = Decimal.sum(...properties).toNumber() || 0;
  const value = formatter.format(sum);

  return {
    result: sum || 0,
    format: value || "$0",
  };
};

/**
 *  @typedef {object} Values
 *  @property {number} initialValue
 *  @property {number[]} returners
 */

/**
 * calcula  todos los net premium
 * @param  {Values}  valores que tienen que ir sumados siempre
 * @param {string} deductionType  condición para que la exención se incluya o no en la suma
 * @param {number} exception valor de la exención
 * @returns {number}
 */

export const calculateNet = ({ initialValue, returners }, deductionType, exception) => {
  let op = returners.reduce((accumulator, currentValue) => Decimal.sub(accumulator, currentValue).toNumber(), initialValue);

  if (deductionType === "At inception") {
    op = Decimal.sub(op, exception).toNumber();
  }

  return op || 0;
};
