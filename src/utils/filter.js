import {FilterType} from './const';

export const Filter = {
  [FilterType.WATCHLIST]: (film) => film.user_details.watchlist,
  [FilterType.HISTORY]: (film) => film.user_details.already_watched,
  [FilterType.FAVORITE]: (film) => film.user_details.favorite,
  [FilterType.TOP_RATING]: (film) => film.film_info.total_rating,
  [FilterType.MOST_COMMENTED]: (film) => film.comments.length,
};
