import { createElement } from '../../render.js';
import { setHumanizeDateFilmRelease } from '../../utils.js';

const createGenreItem = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

const createFilmRowTable = (cell, term = cell) => `<tr class="film-details__row">
  <td class="film-details__term">${term}</td>
  <td class="film-details__cell">${cell}</td>
</tr>`;

function createPopupFilmDetailsInfo({film_info: filmInfo}) {
  const {
    title,
    alternative_title: alternativeTitle,
    actors,
    release,
    poster,
    writers,
    director,
    duration,
    description,
    genre,
    total_rating: totalRating,
    age_rating: ageRating,
  } = filmInfo;

  const { release_country: country, date} = release;
  const genreSubtitleText = `${ genre.length > 1 ? 'Genres' : 'Genre'}`;

  return `<div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">+${ageRating}</p>
        </div>
          <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            ${createFilmRowTable(director)}
            ${createFilmRowTable(writers)}
            ${createFilmRowTable(actors.join(', '), 'actors')}
            ${createFilmRowTable(setHumanizeDateFilmRelease(date),'Release Date')}</td>
            ${createFilmRowTable(duration)}
            ${createFilmRowTable(country)}
            ${createFilmRowTable(createGenreItem(genre), genreSubtitleText)}
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>`;
}

export default class NewFilmPopupDetailsInfoView {
  #element = null;
  #film;

  constructor(FilmModel) {
    this.#film = FilmModel;
  }

  get template() {
    return createPopupFilmDetailsInfo(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
