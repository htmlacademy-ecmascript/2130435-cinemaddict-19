import { remove, render, replace } from '../framework/render';
import { UpdateType, UserAction } from '../utils/const';
import FilmCardView from '../view/main-section/film-card-view';

export default class FilmPresenter {
  #film;
  #commentsModel;

  #handleDataChange;
  #handleOpenPopup;

  #filmCardComponent = null;

  constructor({ film, commentsModel, onDataChange, onFilmClick }) {
    this.#film = film;
    this.#commentsModel = commentsModel;

    this.#handleDataChange = onDataChange;
    this.#handleOpenPopup = onFilmClick;
  }

  #createFilmCard() {
    return new FilmCardView({
      film: this.#film,
      onFilmControlButtonFilterClick: this.#handleFilmControlButtonFilterClick,
      onFilmClick: this.openPopupHandler
    });
  }

  openPopupHandler = () => {
    this.#handleOpenPopup({
      film: this.#film,
      handleDataChange: this.#handleDataChange,
    });
    this.#handleDataChange(
      UserAction.OPEN_POPUP,
      UpdateType.MAJOR,
      this.#film
    );
  };

  #handleFilmControlButtonFilterClick = (filterType) => {
    this.#film.userDetails[filterType] = !this.#film.userDetails[filterType];
    this.#handleDataChange(
      UserAction.UPDATE_FILM_CARD,
      UpdateType.MINOR,
      this.#film
    );
  };

  #rerenderCard() {
    const updateFilmCard = this.#createFilmCard();
    replace(updateFilmCard, this.#filmCardComponent);
    this.#filmCardComponent = updateFilmCard;
  }

  destroy() {
    remove(this.#filmCardComponent);
  }

  init(place) {
    if (this.#filmCardComponent) {
      return this.#rerenderCard();
    }

    this.#filmCardComponent = this.#createFilmCard();
    render(this.#filmCardComponent, place);
  }

  setUpdateAborting() {
    this.#filmCardComponent.shake();
  }

}
