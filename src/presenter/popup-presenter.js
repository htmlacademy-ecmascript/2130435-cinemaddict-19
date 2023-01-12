import { render } from '../framework/render.js';
import NewFilmPopupView from '../view/template/film-popup-view.js';

export default class PopupPresenter {
  #place = document.body;
  #filmModel;
  #commentsList;
  #correctFilmPopup;
  #popupComponent = null;

  constructor({ FilmModel, CommentsFilmModel }) {
    this.#filmModel = FilmModel;
    this.#commentsList = CommentsFilmModel.comments;
  }

  #findCorrectFilmPopup = (evt) => {
    if (this.#popupComponent) {
      this.#popupComponent.removePopup();
    }

    document.body.classList.add('hide-overflow');

    const currentId = evt.detail.filmId;
    this.#correctFilmPopup = this.#filmModel.films.find((film) => film.id === currentId);

    this.#popupComponent = new NewFilmPopupView({
      correctFilm: this.#correctFilmPopup,
      commentsFilm: this.#commentsList,
      removePopup: this.#removePopup,
      changeButtonState: this.toggleButtonState
    });

    render(this.#popupComponent, this.#place);
  };

  toggleButtonState = (button) => {
    this.#correctFilmPopup.user_details[button] = !this.#correctFilmPopup.user_details[button];
  };

  #removePopup() {
    this.element.remove();
    this.removeElement();
    document.body.classList.remove('hide-overflow');
  }

  init() {
    window.addEventListener('onClickFilmCard', this.#findCorrectFilmPopup);
  }
}
