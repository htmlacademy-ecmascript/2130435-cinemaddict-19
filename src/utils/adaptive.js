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
    if (isObject(adaptiveValue)) {
      adaptiveValue = adaptiveToServer(values);
    }
    snakeObject[adaptiveKey] = adaptiveValue;
  });
  return snakeObject;
}

function adaptiveToApp(transformObject) {
  const camelObject = {};
  Object.entries(transformObject).forEach(([key, values]) => {
    const adaptiveKey = snakeToCamel(key);
    let adaptiveValue = values;
    if (isObject(adaptiveValue)) {
      adaptiveValue = adaptiveToApp(values);
    }
    camelObject[adaptiveKey] = adaptiveValue;
  });
  return camelObject;
}

export { adaptiveToServer, adaptiveToApp };
