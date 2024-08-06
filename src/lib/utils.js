moment.locale('es');
import moment from 'moment';
import numeral from 'numeral';

const toCapitalizeCase = (value='') => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function formatDateMoment(dateToFormat) {
  if (dateToFormat) {
    const date = moment(dateToFormat);
    const day = date.format('DD');
    const month = date.format('MMMM').toUpperCase();
    const year = date.format('YYYY').toUpperCase();
    const hour = date.format('HH:mm').toUpperCase();
    return `${day} de ${month} del ${year}`;
  } else {
    return dateToFormat;
  }
}

export function formatDateWallet(dateToFormat) {
  if (dateToFormat) {
    const date = moment(dateToFormat);
    const day = date.format('DD');
    const month = toCapitalizeCase(date.format('MMMM').toString());
    const year = date.format('YYYY').toUpperCase();
    const hour = date.format('HH:mm').toUpperCase();
    return `${month} ${day}, ${year}`;
  } else {
    return dateToFormat;
  }
}


export function simpleDateFormat(dateToFormat) {
  if (!dateToFormat) return null;

  const [year, month, day] = dateToFormat.split('-');
  return `${month}/${day}/${year}`;
}

export default {
  formatDateMoment,
};

export const getBase64FromFile = (file) =>
  new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onload = () => res(reader.result);
    reader.onerror = rej;

    reader.readAsDataURL(file);
  });


  
/**
 * formateo de información a guardar en la base de datos en el apartado de complete_account
 * @param {object} object 
 * @returns {object} result información formateada  
 */

export const formatInfo = (object) => {
    
  const data = object
   for (const property of Object.keys(data))
   {
      if(!data[property]) continue

      const value = data[property]
      const numberValue =  numeral(data[property]).value()
      const isDate = moment(value, moment.ISO_8601, true).isValid()

      if(!isNaN(numberValue) && numberValue !== null){
          data[property] = numberValue
      }

      if(isDate && isNaN(value)){
          data[property] = value
      }

      if( typeof value === 'string'  && isNaN(numberValue) && !isDate ){
          if(value.includes("$")){
              const valueFormatted = numeral(value)
              data[property] = valueFormatted.value()    
          }else{
              data[property] = value
          }
          
      }
   }

   return data
}

/**
 * cambio de nombres de propiedades de un objeto apartar de un map 
 * @param {Object} obj 
 * @param {Map} fn 
 * @returns 
 */

export const mapObject = (obj, fn) => {
  return Object.keys(obj).reduce(function(result, key) {
    result[fn(key)] = obj[key];
    return result;
  }, {});
}
