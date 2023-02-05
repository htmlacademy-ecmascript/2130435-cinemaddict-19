import { remove, render, replace } from '../framework/render.js';
import { UpdateType, UserAction } from '../utils/const.js';
import FilmCardView from '../view/main-films-list/film-card-view.js';

export default class FilmPresenter {
  #film;
  #commentsModel;

  #handleDataChange;
  #handleOpenPopup;
  #currentCommentsFilm;

  #filmCardComponent = null;

  constructor({ film, commentsModel, onDataChange, onFilmClick }) {
    this.#film = film;
    this.#commentsModel = commentsModel;
    this.#handleDataChange = onDataChange;
    this.#currentCommentsFilm = this.#findCommentsFilm(this.#film);

    this.#handleOpenPopup = onFilmClick;
  }

  #createFilmCard() {
    this.#currentCommentsFilm = this.#findCommentsFilm(this.#film);
    return new FilmCardView({
      film: this.#film,
      currentComments: this.#currentCommentsFilm,
      onFilmControlButtonFilterClick: this.#handleFilmControlButtonFilterClick,
      onFilmClick: this.openPopupHandler
    });
  }

  #findCommentsFilm(film) {
    return this.#commentsModel
      .filter((comment) => film.comments.some((filmId) => filmId === comment.id));
  }

  openPopupHandler = () => {
    this.#handleOpenPopup({
      film: this.#film,
      commentsModel: this.#commentsModel,
      handleDataChange: this.#handleDataChange,
    });
  };

  #handleFilmControlButtonFilterClick = (filterType) => {
    this.#film.user_details[filterType] = !this.#film.user_details[filterType];
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      UpdateType.CLOSED_POPUP,
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

}