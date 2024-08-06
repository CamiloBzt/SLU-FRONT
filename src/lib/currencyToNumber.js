export default function formatCurrencyToNumber(val) {
  return Number(val.replace(/[^0-9.-]+/g, ''));
}
