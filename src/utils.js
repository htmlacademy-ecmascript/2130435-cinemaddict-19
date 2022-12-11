import { ONE_HOUR } from './const.js';

const MAX_SENTENCES = 4;

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

const getRandomUniqueElementsArray = (array) => {
  const uniqueValue = [];
  const maxValue = getRandomPositiveInteger(1, array.length - 1);

  for (let i = 0; i < maxValue; i++) {
    let currentValue = getRandomPositiveInteger(0, array.length - 1);
    while (uniqueValue.includes(array[currentValue])) {
      currentValue = getRandomPositiveInteger(0, array.length - 1);
    }
    uniqueValue.push(array[currentValue]);
  }
  return uniqueValue;
};

const getRandomDate = ({ MIN_YEAR, MAX_YEAR, MIN_MONTH, MAX_MONTH, MIN_DAY, MAX_DAY }) => {
  const year = getRandomPositiveInteger(MIN_YEAR, MAX_YEAR);
  const month = String(getRandomPositiveInteger(MIN_MONTH, MAX_MONTH)).padStart(2, 0);
  const day = String(getRandomPositiveInteger(MIN_DAY, MAX_DAY)).padStart(2, 0);
  return new Date(`${year}-${month}-${day}`);
};

const getRandomText = (array) => {
  const sentences = [];
  const sentencesNumber = [];
  let maxCounterValue = getRandomPositiveInteger(0, MAX_SENTENCES);
  if (array.length - 1 < maxCounterValue) {
    maxCounterValue = array.length - 1;
  }
  for (let counter = 0; counter <= maxCounterValue; counter++) {
    let sentencesCurrentNumber = getRandomPositiveInteger(0, array.length - 1);
    while (sentencesNumber.includes(sentencesCurrentNumber)) {
      sentencesCurrentNumber = getRandomPositiveInteger(0, array.length - 1);
    }
    sentencesNumber.push(sentencesCurrentNumber);
    sentences.push(array[sentencesCurrentNumber]);
  }
  return sentences.slice().join(' ');
};

const getDuration = (time) => {
  const hour = Math.floor(time / ONE_HOUR);
  const minute = time - (hour * ONE_HOUR);
  return `${hour ? `${hour}h ` : ''}${minute}m`;
};


export { getRandomPositiveInteger, getRandomElementArray, generateId, getRandomDate, getRandomText, getDuration, getRandomUniqueElementsArray };
