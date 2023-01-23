import { remove, render, replace } from '../framework/render.js';
import FilmDetailsBottomContainerView from '../view/popup/containers/film-details-bottom-container-view.js';
import FilmDetailsInnerPopupView from '../view/popup/containers/film-details-inner-view.js';
import FilmsDetailsTopContainerView from '../view/popup/containers/film-details-top-container-view.js';
import SectionFilmDetailsView from '../view/popup/sections/section-film-details-view.js';

export default class PopupPresenter {
  #place = document.body;
  #film;
  #sectionFilmDetailsComponent = new SectionFilmDetailsView();
  #filmDetailsInnerPopupComponent = new FilmDetailsInnerPopupView();

  #filmsDetailsTopContainerComponent;
  #filmsDetailsBottomContainerComponent;

  #handleControlsButtonsClick = null;

  constructor({currentFilmModel, currentFilmCommentsModel, onControlsButtonsClick}) {
    this.#film = currentFilmModel;
    this.#handleControlsButtonsClick = onControlsButtonsClick;

    this.#filmsDetailsTopContainerComponent = new FilmsDetailsTopContainerView({
      currentFilmModel: this.#film,
      onButtonCloseClick: this.#handleButtonCloseClick,
      updateControlButton: this.#updateControlButton,
      onControlButtonClick: this.#handleControlsButtonsClick});

    this.#filmsDetailsBottomContainerComponent = new FilmDetailsBottomContainerView({currentFilmCommentsModel: currentFilmCommentsModel});
  }

  #updateControlButton = () => {
    const topContainerUpdate = new FilmsDetailsTopContainerView({
      currentFilmModel: this.#film,
      onButtonCloseClick: this.#handleButtonCloseClick,
      updateControlButton: this.#updateControlButton,
      onControlButtonClick: this.#handleControlsButtonsClick });

    replace(topContainerUpdate, this.#filmsDetailsTopContainerComponent);
    this.#filmsDetailsTopContainerComponent = topContainerUpdate;
  };

  removePopup() {
    document.body.classList.remove('hide-overflow');
    remove(this.#sectionFilmDetailsComponent);
  }

  #handleButtonCloseClick = () => {
    this.removePopup();
  };

  #onEscapeKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.removePopup();
      document.removeEventListener('keydown', this.onEscapeKeydown);
    }
  };

  init() {
    document.addEventListener('keydown', this.#onEscapeKeydown);
    render(this.#sectionFilmDetailsComponent, this.#place);
    render(this.#filmDetailsInnerPopupComponent, this.#sectionFilmDetailsComponent.element);
    render(this.#filmsDetailsTopContainerComponent, this.#filmDetailsInnerPopupComponent.element);
    render(this.#filmsDetailsBottomContainerComponent, this.#filmDetailsInnerPopupComponent.element);
  }
}
