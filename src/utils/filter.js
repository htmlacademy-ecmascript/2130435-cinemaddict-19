import {FilterType} from './const';

export const Filter = {
  [FilterType.WATCHLIST]: (film) => film.userDetails.watchlist,
  [FilterType.HISTORY]: (film) => film.userDetails.alreadyWatched,
  [FilterType.FAVORITE]: (film) => film.userDetails.favorite,
  [FilterType.TOP_RATING]: (film) => film.filmInfo.totalRating,
  [FilterType.MOST_COMMENTED]: (film) => film.comments.length,
};
