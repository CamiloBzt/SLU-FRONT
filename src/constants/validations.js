import { isValidPhoneNumber } from 'libphonenumber-js';
import { helpers } from 'vuelidate/lib/validators';

export const validPhone = (value) => {
  if (!!value) return isValidPhoneNumber(value, 'MX');
  else return false;
};
export const OnlyText = helpers.regex('OnlyText', /^[a-zA-Z\u00C0-\u00ff\s]+$/);
export const ValidChars = helpers.regex('ValidChars', /^[#.0-9a-zA-Z\s,-]+$/);
export const OnlyDigits = helpers.regex('OnlyDigits', /^[0-9]*$/);
export const DigitsAndDecimals = helpers.regex('DigitsAndDecimals', /^\s*(?=.*[0-9])\d*(?:\.\d{1,3})?\s*$/);
export const CurrencyDigits = helpers.regex(
  'CurrencyDigits',
  /^\$?\-?([1-9]{1}[0-9]{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\-?\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$/
);
export const Percentage = (value) => value <= 100 && value >= 0;
