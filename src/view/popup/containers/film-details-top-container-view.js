import AbstractView from '../../../framework/view/abstract-view.js';
import {setHumanizeDateFilmRelease} from '../../../utils/utils.js';

function createFilmDetailsInfoHead(film) {
  return `
  <div class="film-details__info-head">
    <div class="film-details__title-wrap">
      <h3 class="film-details__title">${film.title}</h3>
      <p class="film-details__title-original">${film.alternative_title}</p>
    </div>

    <div class="film-details__rating">
      <p class="film-details__total-rating">${film.total_rating}</p>
    </div>
  </div>`;
}

function createFilmDetailsRow(term, cell) {
  return `
  <tr class="film-details__row">
    <td class="film-details__term">${term}</td>
    <td class="film-details__cell">${cell}</td>
  </tr>`;
}

function createGenresItems (genres) {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
}

function createFilmDetailsTable(film) {
  const genreSubtitleText = `${ film.genre.length > 1 ? 'Genres' : 'Genre'}`;
  return `
  <table class="film-details__table">
    ${createFilmDetailsRow('Director', film.director)}
    ${createFilmDetailsRow('Writers', film.writers.join(', '))}
    ${createFilmDetailsRow('Actors', film.actors.join(', '))}
    ${createFilmDetailsRow('Release Date', setHumanizeDateFilmRelease(film.release.date))}
    ${createFilmDetailsRow('Duration', film.duration)}
    ${createFilmDetailsRow('Country', film.release.release_country)}
    ${createFilmDetailsRow(genreSubtitleText, createGenresItems(film.genre))}
  </table>`;
}

function createFilmDetailsControls({ already_watched: watched, favorite, watchlist }) {
  return `
  <section class="film-details__controls">
    <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button  film-details__control-button--watched ${watched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button film-details__control-button--favorite ${favorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
  </section>`;
}

function createFilmDetailsTopContainer(film) {
  return `
  <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${film.film_info.poster}" alt="">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          ${createFilmDetailsInfoHead(film.film_info)}
          ${createFilmDetailsTable(film.film_info)}
          <p class="film-details__film-description">
            ${film.film_info.description}
          </p>
        </div>
      </div>

      ${createFilmDetailsControls(film.user_details)}
    </div>`;
}

export default class FilmsDetailsTopContainerView extends AbstractView {
  #film;

  #handleButtonCloseClick = null;

  #watchlistClickHandler = null;
  #alreadyWatchedClickHandler = null;
  #favoriteClickHandler = null;

  constructor({ currentFilmModel, onButtonCloseClick, onFilmControlButtonFilterClick }) {
    super();
    this.#film = currentFilmModel;
    this.#handleButtonCloseClick = onButtonCloseClick;

    this.#watchlistClickHandler = (evt) => {
      onFilmControlButtonFilterClick('watchlist');
      evt.target.classList.toggle('film-details__control-button--active');
    };
    this.#alreadyWatchedClickHandler = (evt) => {
      onFilmControlButtonFilterClick('already_watched');
      evt.target.classList.toggle('film-details__control-button--active');
    };
    this.#favoriteClickHandler = (evt) => {
      onFilmControlButtonFilterClick('favorite');
      evt.target.classList.toggle('film-details__control-button--active');
    };

    this.#initHandlers();

  }

  #buttonCloseClickHandler = () => {
    this.#handleButtonCloseClick();
  };

  #initHandlers() {
    this.element.querySelector('.film-details__close-btn').
      addEventListener('click', this.#buttonCloseClickHandler);

    this.element.querySelector('.film-details__control-button--watchlist').
      addEventListener('click', this.#watchlistClickHandler);
    this.element.querySelector('.film-details__control-button--watched').
      addEventListener('click', this.#alreadyWatchedClickHandler);
    this.element.querySelector('.film-details__control-button--favorite').
      addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createFilmDetailsTopContainer(this.#film);
  }
}
