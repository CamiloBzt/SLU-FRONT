export const formatCurrency = (amount) => {
    if (isNaN(amount)) {
        return "Invalid data";
      }

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });
      return formatter.format(amount);
}

export const unFormatCurrency = (strAmount) => {
  const result = +strAmount.replace(/[^0-9.-]/g, '');
  return result;
}

