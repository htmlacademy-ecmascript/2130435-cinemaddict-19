import { render } from '../framework/render.js';
import FilmCardView from '../view/main-films-list/film-card-view.js';
import PopupPresenter from './popup-presenter.js';


export default class FilmCardPresenter {
  #film;
  #currentComments;
  #filmCardComponent = null;

  constructor({currentFilmModel, currentComments}) {
    this.#film = currentFilmModel;
    this.#currentComments = currentComments;
  }

  #renderPopup() {
    document.body.classList.add('hide-overflow');
    const popupPresenter = new PopupPresenter({currentFilmModel: this.#film, currentFilmCommentsModel: this.#currentComments});
    popupPresenter.init();
  }

  #handleFilmCardClick = () => {
    this.#renderPopup();
  };

  init(place) {
    this.#filmCardComponent = new FilmCardView({currentFilmModel: this.#film, onFilmCardClick: this.#handleFilmCardClick});
    render(this.#filmCardComponent, place);
  }
}
