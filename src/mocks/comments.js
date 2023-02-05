import { COMMENT_EMOTION } from '../utils/const.js';
import { generateId, getRandomDate, getRandomElementArray, getRandomText } from '../utils/utils.js';

const TEXTS_FOR_COMMENTS = [
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

const DateCommentsValue = {
  MIN_YEAR: 2014,
  MAX_YEAR: 2021,
  MIN_MONTH: 1,
  MAX_MONTH: 12,
  MIN_DAY: 1,
  MAX_DAY: 27
};


const getCommentUniqueId = generateId();

const createMockComment = () => ({
  'id': getCommentUniqueId(),
  'author': getRandomElementArray(COMMENTS_AUTHORS),
  'comment': getRandomText(TEXTS_FOR_COMMENTS),
  'date': getRandomDate(DateCommentsValue),
  'emotion': getRandomElementArray(COMMENT_EMOTION)
});

export { createMockComment, getCommentUniqueId };
