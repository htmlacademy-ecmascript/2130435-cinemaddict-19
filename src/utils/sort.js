import dayjs from 'dayjs';

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortTopRated(firstFilm, secondFilm) {
  const {totalRating: secondFilmRating} = secondFilm.filmInfo;
  const {totalRating: firstFilmRating} = firstFilm.filmInfo;
  return Number(secondFilmRating) - Number(firstFilmRating);
}

function sortMostCommented(firstFilm, secondFilm) {
  const {comments: secondFilmCommented} = secondFilm;
  const {comments: firstFilmCommented} = firstFilm;
  return secondFilmCommented.length - firstFilmCommented.length;
}

function sortFilmDate(filmA, filmB) {
  const {date: firstFilmRating} = filmA.filmInfo.release;
  const {date: secondFilmRating} = filmB.filmInfo.release;
  const weight = getWeightForNullDate(firstFilmRating, secondFilmRating);

  return weight ?? dayjs(secondFilmRating).diff(dayjs(firstFilmRating));
}

function sortFilmRating(filmA, filmB) {
  const {totalRating: firstFilmRating} = filmA.filmInfo;
  const {totalRating: secondFilmRating} = filmB.filmInfo;
  return Number(secondFilmRating) - Number(firstFilmRating);
}

export { sortTopRated, sortMostCommented, sortFilmDate, sortFilmRating };
