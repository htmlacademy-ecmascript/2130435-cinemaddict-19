import { COMMENT_EMOTION } from '../const.js';
import { generateId, getRandomElementArray, getRandomPositiveInteger } from '../utils.js';

const TEXT_FOR_COMMENT = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const COMMENTS_AUTHORS = ['Ilya O\'Reilly', 'Andy Smith', 'William Johns', 'Bob Allan', 'Mike Grey'];

const COMMENTS_LIST_LENGTH = 9;


export const getCommentUniqueId = generateId();

const getTextForComment = (array) => {
  const sentences = [];
  const sentencesNumber = [];
  let counter = 0;
  let maxCounterValue = getRandomPositiveInteger(0, 4);
  if (array.length - 1 < maxCounterValue) {
    maxCounterValue = array.length - 1;
  }
  while (counter <= maxCounterValue) {
    let sentencesCurrentNumber = getRandomPositiveInteger(0, array.length - 1);
    while (sentencesNumber.includes(sentencesCurrentNumber)) {
      sentencesCurrentNumber = getRandomPositiveInteger(0, array.length - 1);
    }
    sentencesNumber.push(sentencesCurrentNumber);
    sentences.push(array[sentencesCurrentNumber]);
    counter++;
  }

  return sentences.slice().join(' ');
};

const generateRandomDate = () => {
  const year = getRandomPositiveInteger(2014, 2021);
  const month = String(getRandomPositiveInteger(1, 12)).padStart(2, 0);
  const day = String(getRandomPositiveInteger(1, 27)).padStart(2, 0);
  return `${year}-${month}-${day}`;
};


const getDate = () => new Date(generateRandomDate());

const createMockComment = () => ({
  'id': getCommentUniqueId(),
  'author': getRandomElementArray(COMMENTS_AUTHORS),
  'comment': getTextForComment(TEXT_FOR_COMMENT),
  'date': getDate(),
  'emotion': getRandomElementArray(COMMENT_EMOTION)
});

const CommentsDataMocksList = Array.from({ length: COMMENTS_LIST_LENGTH }, createMockComment);

export { CommentsDataMocksList };
