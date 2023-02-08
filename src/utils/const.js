const COMMENTS_EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const START_POSITION = 0;

const DescriptionTextLength = {
  MIN: 0,
  MAX: 139
};

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
  HISTORY: 'history',
  FAVORITE: 'favorite',
  TOP_RATING: 'rated',
  MOST_COMMENTED: 'commented',
};

const TitleEmptyList = {
  ALL: 'There are no movies in our database',
  WATCHLIST: 'There are no movies to watch now',
  HISTORY: 'There are no watched movies now',
  FAVORITE: 'There are no favorite movies now',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  UPDATE_FILM_CARD: 'UPDATE_FILM_CARD',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  OPEN_POPUP: 'OPEN_POPUP'
};

const UpdateType = {
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const ModeRenderList = {
  NEW: 'normal',
  UPDATE: 'update',
  LOAD: 'load'
};

const TitleList = {
  RATED: 'Top rated',
  COMMENTED: 'Most commented',
  STANDARD_LIST_TITLE: 'All movies. Upcoming',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const FilmsMoreButtonDownloadParameters = {
  START: 0,
  STEP: 5,
};

const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const Url = {
  FILMS: 'movies',
  COMMENTS: 'comments'
};

const Selector = {
  MAIN: '.main',
  FOOTER: '.footer',
  HEADER: '.header'
};

const WINDOW_POPUP_CLASS = 'hide-overflow';

const KeyName = {
  ESCAPE: 'Escape'
};

const RankWatchedRange = {
  MIN_NOVICE: 0,
  MAX_NOVICE: 10,
  MIN_FAN: 11,
  MAX_FAN: 20,
  MIN_MOVIE_BUFF: 21
};

const MAX_LENGTH_EXTRA_FILM_LIST = 2;

export { COMMENTS_EMOTIONS, TypeButton, DateFormat, UserAction, UpdateType, SortType, FilterType, TitleEmptyList, DescriptionTextLength, ModeRenderList, TitleList, FilmsMoreButtonDownloadParameters, Method, Url, Selector, TimeLimit, START_POSITION, WINDOW_POPUP_CLASS, KeyName, MAX_LENGTH_EXTRA_FILM_LIST, RankWatchedRange };
