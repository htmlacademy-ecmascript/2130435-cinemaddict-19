import he from 'he';

function isObject(type) {
  return (typeof type === 'object' && !Array.isArray(type) && type !== null);
}

function snakeToCamel(str) {
  const regexp = /_+\w/g;
  const transformCamel = (match) => match.slice(1).toUpperCase();
  return str.replace(regexp, transformCamel);
}

function camelToSnake(str) {
  const regexp = /[A-Z]/g;
  const transformSnake = (match) => `_${match.slice(0).toLowerCase()}`;
  return str.replace(regexp, transformSnake);
}

function adaptiveToServer(transformObject) {
  const snakeObject = {};
  Object.entries(transformObject).forEach(([key, values]) => {
    const adaptiveKey = camelToSnake(key);
    let adaptiveValue = values;
    let screenValue = null;
    if (isObject(adaptiveValue)) {
      adaptiveValue = adaptiveToServer(values);
    }
    if (typeof adaptiveValue === 'string') {
      screenValue = he.encode(adaptiveValue);
    }
    snakeObject[adaptiveKey] = screenValue || adaptiveValue;
  });
  return snakeObject;
}

function adaptiveToApp(transformObject) {
  const camelObject = {};
  Object.entries(transformObject).forEach(([key, values]) => {
    const adaptiveKey = snakeToCamel(key);
    let adaptiveValue = values;
    let screenValue = null;
    if (isObject(adaptiveValue)) {
      adaptiveValue = adaptiveToApp(values);
    }
    if (typeof adaptiveValue === 'string') {
      screenValue = he.encode(adaptiveValue);
    }
    camelObject[adaptiveKey] = screenValue || adaptiveValue;
  });
  return camelObject;
}

export { adaptiveToServer, adaptiveToApp };
