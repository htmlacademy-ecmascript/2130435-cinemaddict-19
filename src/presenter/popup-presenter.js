import { render } from '../render.js';
import NewFilmPopupView from '../view/template/film-popup-view.js';

export default class PopupPresenter {
  #place;
  #filmModel;
  #commentsList;

  constructor(place, FilmModel, CommentsFilmModel) {
    this.#place = place;
    this.#filmModel = FilmModel;
    this.#commentsList = CommentsFilmModel.comments;
  }

  init() {
    const popupComponent = new NewFilmPopupView(this.#filmModel, this.#commentsList);
    render(popupComponent, this.#place);
  }
}

