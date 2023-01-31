const COMMENT_EMOTION = ['smile', 'sleeping', 'puke', 'angry'];
const ONE_HOUR = 60;

const COMMENTS_LIST_LENGTH = 9;
const MAX_SENTENCES = 4;

const MIN_DESCRIPTION_TEXT_LENGTH = 0;
const MAX_DESCRIPTION_TEXT_LENGTH = 139;

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
  DATA_ATTRIBUTE: 'data-sort-type'
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'watched',
  FAVORITE: 'favorite',
};

const TitleEmptyList = {
  ALL: 'There are no movies in our database',
  WATCHLIST: 'There are no movies to watch now',
  WATCHED: 'There are no watched movies now',
  FAVORITE: 'There are no favorite movies now',
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

const ModeRenderList = {
  NEW: 'normal',
  UPDATE: 'update',
  LOAD: 'load'
};

export { COMMENT_EMOTION, ONE_HOUR, COMMENTS_LIST_LENGTH, MAX_SENTENCES, TypeButton, DateFormat, UserAction, UpdateType, SortType, FilterType, TitleEmptyList, MIN_DESCRIPTION_TEXT_LENGTH
  , MAX_DESCRIPTION_TEXT_LENGTH, ModeRenderList };
