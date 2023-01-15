import { render } from '../framework/render';
import NewFilmCardView from '../view/organism/film-card-view.js';


export default class FilmCardPresenter {
  #place = null;
  #filmCardComponent = null;

  constructor({ place }) {
    this.#place = place;
  }

  init(film) {
    this.#filmCardComponent = new NewFilmCardView(film);
    render(this.#filmCardComponent, this.#place);
  }

}
