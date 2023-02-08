import AbstractStatefulView from '../../../framework/view/abstract-stateful-view';
import {getDuration, setHumanizeDateFilmRelease} from '../../../utils/utils';

function createFilmDetailsInfoHead(film) {
  return `
  <div class="film-details__info-head">
    <div class="film-details__title-wrap">
      <h3 class="film-details__title">${film.title}</h3>
      <p class="film-details__title-original">${film.alternativeTitle}</p>
    </div>

    <div class="film-details__rating">
      <p class="film-details__total-rating">${film.totalRating}</p>
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
    ${createFilmDetailsRow('Duration', getDuration(Number(film.duration)))}
    ${createFilmDetailsRow('Country', film.release.releaseCountry)}
    ${createFilmDetailsRow(genreSubtitleText, createGenresItems(film.genre))}
  </table>`;
}

function createFilmDetailsControls({ alreadyWatched: watched, favorite, watchlist }) {
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
          <img class="film-details__poster-img" src="./${film.filmInfo.poster}" alt="">

          <p class="film-details__age">${film.filmInfo.ageRating}+</p>
        </div>

        <div class="film-details__info">
          ${createFilmDetailsInfoHead(film.filmInfo)}
          ${createFilmDetailsTable(film.filmInfo)}
          <p class="film-details__film-description">
            ${film.filmInfo.description}
          </p>
        </div>
      </div>

      ${createFilmDetailsControls(film.userDetails)}
    </div>`;
}

export default class FilmsDetailsTopContainerView extends AbstractStatefulView {
  #handleButtonCloseClick = null;

  #watchlistClickHandler = null;
  #alreadyWatchedClickHandler = null;
  #favoriteClickHandler = null;

  constructor({ currentFilmModel, onButtonCloseClick, onFilmControlButtonFilterClick }) {
    super();
    this._setState({
      ...currentFilmModel
    });
    this.#handleButtonCloseClick = onButtonCloseClick;

    this.#watchlistClickHandler = () => {
      onFilmControlButtonFilterClick('watchlist');
    };
    this.#alreadyWatchedClickHandler = () => {
      onFilmControlButtonFilterClick('alreadyWatched');
    };
    this.#favoriteClickHandler = () => {
      onFilmControlButtonFilterClick('favorite');
    };

    this._restoreHandlers();

  }

  #buttonCloseClickHandler = () => {
    this.#handleButtonCloseClick();
  };

  _restoreHandlers() {
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
    return createFilmDetailsTopContainer(this._state);
  }
}
