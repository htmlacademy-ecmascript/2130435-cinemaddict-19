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

export { sortFilmDate, sortFilmRating };
