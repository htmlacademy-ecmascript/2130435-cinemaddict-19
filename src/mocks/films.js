import { generateId, getDuration, getRandomDate, getRandomElementArray, getRandomPositiveInteger, getRandomText, getRandomUniqueElementsArray } from '../utils.js';
import { CommentsDataMocksList } from './comments.js';

const MAX_VALUE_RATING = 10;
const MAX_VALUE_AGE = 18;

const MIN_VALUE_DURATION = 10;
const MAX_VALUE_DURATION = 140;

const ACTIVE_STATES_BUTTONS = [true, false];

const COUNTRIES = ['USA', 'Russia', 'England', 'Finland', 'France', 'China'];
const FILMS_DIRECTORS = ['Alfred Hitchcock ', 'Orson Welles ', 'John Ford', 'Howard Hawks', 'Martin Scorsese', 'Akira Kurosawa'];
const FILMS_WRITES = ['Buster Keaton', 'Frank Capra', 'Federico Fellini', 'Steven Spielberg', 'Jean Renoir'];
const FILMS_ACTORS = ['Morgan Freeman', 'Will Smith', 'Ben Affleck', 'Bruce Willias', 'Nickolas Cage', 'Robert De\'Niro', 'Johny Depp'];
const FILMS_GENRES = ['Comedy', 'Horror', 'Adventure', 'Drama', 'Musicale', 'Action', 'Fantasy', 'Fantastic', 'Family'];


const TEXTS_FOR_FILMS = [
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

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

const FILMS_TITLES = [
  {
    title:'A Little Pony Without The Carpet',
    alternativeTitle: 'Origin: A Little Pony Without The Carpet'
  },
  {
    title:'The Dance of Life',
    alternativeTitle: 'Origin: The Dance of Life'
  },
  {
    title:'Popeye the Sailor Meets Sindbad the Sailor',
    alternativeTitle: 'Origin: Popeye the Sailor Meets Sindbad the Sailor'
  },
  {
    title:'Sagebrush Trail',
    alternativeTitle: 'Origin: Sagebrush Trail'
  },
  {
    title:'The Man with the Golden Arm',
    alternativeTitle: 'Origin: The Man with the Golden Arm'
  },
  {
    title:'The Great Flamarion',
    alternativeTitle: 'Origin: The Great Flamarion'
  }
];

const DateFilmValue = {
  MIN_YEAR: 1934,
  MAX_YEAR: 2021,
  MIN_MONTH: 1,
  MAX_MONTH: 12,
  MIN_DAY: 1,
  MAX_DAY: 27
};

const DateWatchingFilmValue = {
  MIN_YEAR: 2017,
  MAX_YEAR: 2021,
  MIN_MONTH: 1,
  MAX_MONTH: 12,
  MIN_DAY: 1,
  MAX_DAY: 27
};

const getFilmUniqueId = generateId();

const generateCommentsIdsByFilm = (commentsListData) => {
  const commentsListIds = Array.from({ length: commentsListData.length }, (_, k) => k + 1);
  commentsListIds.sort(() => Math.random() - 0.5);

  return () => {
    if (commentsListIds.length) {
      return commentsListIds.shift();
    }
    return null;
  };
};

const getCommentsIdsByFilm = generateCommentsIdsByFilm(CommentsDataMocksList);
const getListCommentsIdsByFilm = () => {
  const counterMax = getRandomPositiveInteger(0, 3);
  const currentCommentsList = [];
  for (let counter = 0; counter < counterMax; counter++) {
    currentCommentsList.push(getCommentsIdsByFilm());
  }
  return currentCommentsList;
};

const getFilmTitle = (filmList) => getRandomElementArray(filmList);
const getRating = () => (Math.random() * MAX_VALUE_RATING).toFixed(1);
const getRandomPoster = () => {
  const posterName = getRandomElementArray(POSTERS);
  return `images/posters/${posterName}`;
};

const getFilmInfo = () => {
  const { title, alternativeTitle } = getFilmTitle(FILMS_TITLES);
  return {
    'title': title,
    'alternative_title': alternativeTitle,
    'total_rating': getRating(),
    'poster': getRandomPoster(),
    'age_rating': getRandomPositiveInteger(0, MAX_VALUE_AGE),
    'director': getRandomElementArray(FILMS_DIRECTORS),
    'writers': getRandomUniqueElementsArray(FILMS_WRITES),
    'actors': getRandomUniqueElementsArray(FILMS_ACTORS),
    'release': {
      'date': getRandomDate(DateFilmValue),
      'release_country': getRandomElementArray(COUNTRIES)
    },
    'duration': getDuration(getRandomPositiveInteger(MIN_VALUE_DURATION, MAX_VALUE_DURATION)),
    'genre': getRandomUniqueElementsArray(FILMS_GENRES),
    'description': getRandomText(TEXTS_FOR_FILMS)
  };
};

const getUserDetails = () => ({
  'watchlist': getRandomElementArray(ACTIVE_STATES_BUTTONS),
  'already_watched': getRandomElementArray(ACTIVE_STATES_BUTTONS),
  'watching_date': getRandomDate(DateWatchingFilmValue),
  'favorite': getRandomElementArray(ACTIVE_STATES_BUTTONS)
});

const createMockFilm = () => ({
  'id': getFilmUniqueId(),
  'comments': getListCommentsIdsByFilm(),
  'film_info': getFilmInfo(),
  'user_details': getUserDetails()
});

export { createMockFilm };
