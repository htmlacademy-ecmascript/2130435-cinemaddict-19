const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomElementArray = (array) => array[getRandomPositiveInteger(0, array.length - 1)];


const generateId = () => {
  let counter = 0;
  return () => {
    counter++;
    return counter;
  };
};

export { getRandomPositiveInteger, getRandomElementArray, generateId };
