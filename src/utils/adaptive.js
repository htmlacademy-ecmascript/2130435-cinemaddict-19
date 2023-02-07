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
    if (typeof adaptiveValue === 'object' && !Array.isArray(adaptiveValue) && adaptiveValue !== null) {
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
    if (typeof adaptiveValue === 'object' && !Array.isArray(adaptiveValue) && adaptiveValue !== null) {
      adaptiveValue = adaptiveToApp(values);
    }
    camelObject[adaptiveKey] = adaptiveValue;
  });
  return camelObject;
}

export { adaptiveToServer, adaptiveToApp };
