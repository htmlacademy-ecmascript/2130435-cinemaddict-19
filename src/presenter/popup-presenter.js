import { remove, render } from '../framework/render.js';
import { UpdateType, UserAction } from '../utils/const.js';
import FilmDetailsInnerPopupView from '../view/popup/containers/film-details-inner-view.js';
import FilmsDetailsTopContainerView from '../view/popup/containers/film-details-top-container-view.js';
import SectionFilmDetailsView from '../view/popup/film-information/section-film-details-view.js';
import CommentsPresenter from './comments-presenter';

const START_POSITION = 0;

export default class PopupPresenter {
  #place = document.body;
  #film;
  #handleDataChange;

  #currentFilterChange = null;

  #sectionFilmDetailsComponent = new SectionFilmDetailsView();
  #filmDetailsInnerPopupComponent = new FilmDetailsInnerPopupView();
  #filmsDetailsTopContainerComponent;
  #commentsPresenter;

  constructor({ film, handleDataChange }) {
    this.#film = film;
    this.#handleDataChange = handleDataChange;

    document.addEventListener('keydown', this.#onEscapeKeydown);
  }

  #createFilmsTopContainerView() {
    return new FilmsDetailsTopContainerView({
      currentFilmModel: this.#film,
      onButtonCloseClick: this.#handleButtonCloseClick,
      onFilmControlButtonFilterClick: this.#handleButtonFilterClick
    });
  }

  #createFilmsBottomContainerView(comments) {
    return new CommentsPresenter({
      film: this.#film,
      comments,
      onDataChange: this.#handleDataChange
    });
  }

  #handleButtonFilterClick = (filterType) => {
    this.#currentFilterChange = filterType;
    this.#film.user_details[filterType] = !this.#film.user_details[filterType];
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      UpdateType.OPENED_POPUP,
      this.#film
    );
  };

  #handleButtonCloseClick = () => {
    this.destroy();
    window.popupScrollPosition = START_POSITION;
  };

  #onEscapeKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
      window.popupScrollPosition = START_POSITION;
    }
  };

  #renderPopup() {
    render(this.#sectionFilmDetailsComponent, this.#place);
    render(this.#filmDetailsInnerPopupComponent, this.#sectionFilmDetailsComponent.element);
    this.#filmsDetailsTopContainerComponent = this.#createFilmsTopContainerView();
    render(this.#filmsDetailsTopContainerComponent, this.#filmDetailsInnerPopupComponent.element);

  }

  destroy() {
    window.popupScrollPosition = this.#sectionFilmDetailsComponent.element.scrollTop;
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscapeKeydown);
    remove(this.#sectionFilmDetailsComponent);
  }

  renderComments(comment) {
    if (this.#commentsPresenter) {
      this.#commentsPresenter.destroy();
    }

    this.#commentsPresenter = this.#createFilmsBottomContainerView(comment);
    this.#commentsPresenter.init(this.#filmDetailsInnerPopupComponent.element);
    this.#sectionFilmDetailsComponent.element.scrollTo(START_POSITION, window.popupScrollPosition);
  }

  init() {
    this.#renderPopup();
  }

  setDeleting() {
    this.#commentsPresenter.setDeleting();
  }

  setDeleteAborting() {
    this.#commentsPresenter.setDeleteAborting();
  }

  setAdding() {
    this.#commentsPresenter.setAdding();
  }

  setAddAborting() {
    this.#commentsPresenter.setAddAborting();
  }

  setUpdateAborting() {
    this.#film.user_details[this.#currentFilterChange] = !this.#film.user_details[this.#currentFilterChange];
    const resetFormState = () => {
      this.#filmsDetailsTopContainerComponent.updateElement({
        ...this.#film
      });
    };

    this.#filmsDetailsTopContainerComponent.shake(resetFormState);
  }

}
