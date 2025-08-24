function searchKeyInStorage(item, key) {
  if (!localStorage.getItem(item)) return undefined;
  const obj = JSON.parse(localStorage.getItem(item));
  if (obj && obj[key]) return obj[key];
  return undefined;
}

function searchObjectInStorage(item) {
  if (!localStorage.getItem(item)) return undefined;
  const obj = JSON.parse(localStorage.getItem(item));
  return obj;
}

function setItemInStorage(item, key, value) {
  if (!localStorage.getItem(item))
    localStorage.setItem(item, JSON.stringify({}));
  const obj = JSON.parse(localStorage.getItem(item));
  obj[key] = value;
  localStorage.setItem(item, JSON.stringify(obj));
}

function removeKeyFromStorage(item, key) {
  if (!localStorage.getItem(item)) return undefined;
  const obj = JSON.parse(localStorage.getItem(item));
  if (obj[key]) delete obj[key];
  localStorage.setItem(item, JSON.stringify(obj));
}

function removeItemFromStorage(item) {
  if (localStorage.getItem(item)) localStorage.removeItem(item);
}

const toSnakeCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("_");

const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

const isArray = function (a) {
  return Array.isArray(a);
};

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const keysToCamel = function (o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i);
    });
  }

  return o;
};

const cleanNumericValue = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === "null" ||
    value === ""
  ) {
    return null;
  }
  return String(value); // Convertir a string para GraphQL
};

module.exports = {
  toSnakeCase,
  keysToCamel,
  setItemInStorage,
  searchKeyInStorage,
  removeKeyFromStorage,
  searchObjectInStorage,
  removeItemFromStorage,
  cleanNumericValue,
};
