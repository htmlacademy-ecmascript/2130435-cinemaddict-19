import { createElement } from '../../render.js';
import { setHumanizeDateFilmRelease } from '../../utils.js';

const createGenreItem = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

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
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${setHumanizeDateFilmRelease(date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Duration</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genreSubtitleText}</td>
              <td class="film-details__cell">${createGenreItem(genre)}</td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>`;
}

export default class NewFilmPopupDetailsInfoView {
  constructor(FilmModel) {
    this.film = FilmModel;
  }

  getTemplate() {
    return createPopupFilmDetailsInfo(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
