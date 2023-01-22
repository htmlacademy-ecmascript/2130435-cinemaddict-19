import { render, replace } from '../framework/render.js';
import FilmCardView from '../view/main-films-list/film-card-view.js';

export default class FilmCardPresenter {
  #film;
  #currentComments;
  #filmCardComponent = null;
  #popupPresenter = null;

  #openPopup;

  constructor({currentFilmModel, currentComments, openPopup}) {
    this.#film = currentFilmModel;
    this.#currentComments = currentComments;
    this.#openPopup = openPopup;
  }

  #changeUserDetails = (category) => {
    this.#film.user_details[category] = !this.#film.user_details[category];
    const filmCardUpdatedComponent = new FilmCardView({currentFilmModel: this.#film, onFilmCardClick: this.#handleFilmCardClick, onUserDetailButtonClick: this.#changeUserDetails});
    replace(filmCardUpdatedComponent, this.#filmCardComponent);
    this.#filmCardComponent = filmCardUpdatedComponent;
  };

  #renderPopup = () => {
    this.#openPopup({currentFilmModel: this.#film, currentFilmCommentsModel: this.#currentComments, onControlsButtonsClick: this.#changeUserDetails});
  };

  #handleFilmCardClick = () => {
    this.#renderPopup();
  };

  init(place) {
    this.#filmCardComponent = new FilmCardView({currentFilmModel: this.#film, onFilmCardClick: this.#handleFilmCardClick, onUserDetailButtonClick: this.#changeUserDetails});
    render(this.#filmCardComponent, place);
  }
}
