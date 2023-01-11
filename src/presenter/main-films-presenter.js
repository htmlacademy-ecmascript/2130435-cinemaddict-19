import FilmsListPresenter from './films-list-presenter.js';
import PopupPresenter from './popup-presenter.js';


export default class MainFilmsPresenter {
  #place = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmsListPresenter;
  #popupPresenter;

  constructor({ place, FilmsModel, CommentsModel }) {
    this.#place = place;
    this.#filmsModel = FilmsModel;
    this.#commentsModel = CommentsModel;

    this.#filmsListPresenter = new FilmsListPresenter({
      place: this.#place,
      FilmsModel: this.#filmsModel
    });

    this.#popupPresenter = new PopupPresenter({
      place: document.body,
      FilmModel: this.#filmsModel,
      CommentsFilmModel: this.#commentsModel
    });
  }

  init() {
    this.#filmsListPresenter.init();
    this.#popupPresenter.init();
  }
}
