export const removeDollarSign = (str) => {
  if( str && typeof str === 'string' && str.includes('$') ){
    return parseFloat(str.replace(/\$/g, '').replace(/,/g, ''));
  } else
    return str;
}

