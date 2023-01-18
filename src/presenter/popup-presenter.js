import { remove, render } from '../framework/render.js';
import FilmDetailsBottomContainerView from '../view/popup/containers/film-details-bottom-container-view.js';
import FilmDetailsInnerPopupView from '../view/popup/containers/film-details-inner-view.js';
import FilmsDetailsTopContainerView from '../view/popup/containers/film-details-top-container-view.js';
import SectionFilmDetailsView from '../view/popup/sections/section-film-details-view.js';

export default class PopupPresenter {
  #place = document.body;
  #sectionFilmDetailsComponent = new SectionFilmDetailsView();
  #filmDetailsInnerPopupComponent = new FilmDetailsInnerPopupView();

  #filmsDetailsTopContainerComponent;
  #filmsDetailsBottomContainerComponent;

  removePopup() {
    document.addEventListener('keydown', (evt) => {
      evt.preventDefault();
      if (evt.key === 'Escape') {
        document.body.classList.remove('hide-overflow');
        remove(this.#sectionFilmDetailsComponent);
      }
    });
    this.#filmsDetailsTopContainerComponent.element.querySelector('.film-details__close-btn').
      addEventListener('click', () => {
        document.body.classList.remove('hide-overflow');
        remove(this.#sectionFilmDetailsComponent);
      });
  }

  constructor({currentFilmModel, currentFilmCommentsModel}) {
    this.#filmsDetailsTopContainerComponent = new FilmsDetailsTopContainerView({currentFilmModel: currentFilmModel});
    this.#filmsDetailsBottomContainerComponent = new FilmDetailsBottomContainerView({currentFilmCommentsModel: currentFilmCommentsModel});
  }

  init() {
    render(this.#sectionFilmDetailsComponent, this.#place);
    render(this.#filmDetailsInnerPopupComponent, this.#sectionFilmDetailsComponent.element);
    render(this.#filmsDetailsTopContainerComponent, this.#filmDetailsInnerPopupComponent.element);
    render(this.#filmsDetailsBottomContainerComponent, this.#filmDetailsInnerPopupComponent.element);
    this.removePopup();
  }
}
