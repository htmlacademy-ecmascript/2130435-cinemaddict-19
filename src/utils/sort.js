function sortTopRated(firstFilm, secondFilm) {
  const {total_rating: secondFilmRating} = secondFilm.film_info;
  const {total_rating: firstFilmRating} = firstFilm.film_info;
  return Number(secondFilmRating) - Number(firstFilmRating);
}

function sortMostCommented(firstFilm, secondFilm) {
  const {comments: secondFilmCommented} = secondFilm;
  const {comments: firstFilmCommented} = firstFilm;
  return secondFilmCommented.length - firstFilmCommented.length;
}

export { sortTopRated, sortMostCommented };
