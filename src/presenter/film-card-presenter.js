import { render } from '../framework/render.js';
import FilmCardView from '../view/main-films-list/film-card-view.js';


export default class FilmCardPresenter {
  #film;
  #filmCardComponent = null;

  constructor({currentFilmModel}) {
    this.#film = currentFilmModel;
  }

  init(place) {
    this.#filmCardComponent = new FilmCardView({currentFilmModel: this.#film});
    render(this.#filmCardComponent, place);
  }
}
