import { render, replace } from '../framework/render.js';
import FilmCardView from '../view/main-films-list/film-card-view.js';

export default class FilmCardPresenter {
  #film;
  #currentComments;
  #filmCardComponent = null;

  #initPopup;
  #updateFilter;

  constructor({currentFilmModel, currentComments, initPopup, updateFilter}) {
    this.#film = currentFilmModel;
    this.#currentComments = currentComments;
    this.#initPopup = initPopup;
    this.#updateFilter = updateFilter;
  }

  #changeUserDetails = (category) => {
    this.#film.user_details[category] = !this.#film.user_details[category];
    this.#updateFilter();
    this.#updateFilmCardComponent();
  };

  #updateFilmCardComponent = (commentId) => {
    this.#film.comments.push(commentId);
    const filmCardUpdatedComponent = new FilmCardView({
      currentFilmModel: this.#film,
      onFilmCardClick: this.#handleFilmCardClick,
      onUserDetailButtonClick: this.#changeUserDetails
    });
    replace(filmCardUpdatedComponent, this.#filmCardComponent);
    this.#filmCardComponent = filmCardUpdatedComponent;
  };

  #renderPopup = () => {
    this.#initPopup({
      currentFilmModel: this.#film,
      currentFilmCommentsModel: this.#currentComments,
      onControlsButtonsClick: this.#changeUserDetails,
      updateCommentsCounter: this.#updateFilmCardComponent
    }, this.#film);
  };

  #handleFilmCardClick = () => {
    this.#renderPopup();
  };

  init(place) {
    this.#filmCardComponent = new FilmCardView({
      currentFilmModel: this.#film,
      onFilmCardClick: this.#handleFilmCardClick,
      onUserDetailButtonClick: this.#changeUserDetails
    });
    render(this.#filmCardComponent, place);
  }
}
