const COMMENT_EMOTION = ['smile', 'sleeping', 'puke', 'angry'];
const ONE_HOUR = 60;

const COMMENTS_LIST_LENGTH = 9;
const MAX_SENTENCES = 4;

const TypeButton = {
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
  FAVORITE: 'favorite'
};

const DateFormat = {
  FILM_YEAR: 'YYYY',
  FILM_RELEASE: 'DD MMMM YYYY',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
  DATASET: 'sortType',
  DATA_ATTRIBUTE: ''
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { COMMENT_EMOTION, ONE_HOUR, COMMENTS_LIST_LENGTH, MAX_SENTENCES, TypeButton, DateFormat, UserAction, UpdateType, SortType };
