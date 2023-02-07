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

function sortFilmDate(filmA, filmB) {
  const {date: firstFilmRating} = filmA.film_info.release;
  const {date: secondFilmRating} = filmB.film_info.release;
  return Number(secondFilmRating) - Number(firstFilmRating);
}

function sortFilmRating(filmA, filmB) {
  const {total_rating: firstFilmRating} = filmA.film_info;
  const {total_rating: secondFilmRating} = filmB.film_info;
  return Number(secondFilmRating) - Number(firstFilmRating);
}

export { sortTopRated, sortMostCommented, sortFilmDate, sortFilmRating };
