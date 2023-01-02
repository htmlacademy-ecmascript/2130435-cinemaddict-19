import { render } from '../render.js';
import NewFilmPopupView from '../view/template/film-popup-view.js';

export default class PopupPresenter {
  #place;
  #filmModel;
  #commentsList;
  #correctFilmPopup;

  #findCorrectFilmPopup = (evt) => {
    document.body.classList.add('hide-overflow');

    const currentId = evt.detail.filmId;
    this.#correctFilmPopup = this.#filmModel.films.find((film) => film.id === currentId);

    const popupComponent = new NewFilmPopupView({
      correctFilm: this.#correctFilmPopup,
      commentsFilm: this.#commentsList,
      removePopup: this.#removePopup
    });

    render(popupComponent, this.#place);
  };

  #removePopup() {
    this.element.remove();
    this.removeElement();
    document.body.classList.remove('hide-overflow');
  }

  constructor(place, FilmModel, CommentsFilmModel) {
    this.#place = place;
    this.#filmModel = FilmModel;
    this.#commentsList = CommentsFilmModel.comments;
  }

  init() {
    window.addEventListener('onClickFilmCard', this.#findCorrectFilmPopup);
  }
}
