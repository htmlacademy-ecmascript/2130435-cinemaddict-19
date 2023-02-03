import { remove, render, replace } from '../framework/render.js';
import { UpdateType, UserAction } from '../utils/const.js';
import FilmDetailsBottomContainerView from '../view/popup/containers/film-details-bottom-container-view.js';
import FilmDetailsInnerPopupView from '../view/popup/containers/film-details-inner-view.js';
import FilmsDetailsTopContainerView from '../view/popup/containers/film-details-top-container-view.js';
import SectionFilmDetailsView from '../view/popup/sections/section-film-details-view.js';

const START_POSITION = 0;

export default class PopupPresenter {
  #place = document.body;
  #film;
  #handleDataChange;

  #sectionFilmDetailsComponent = new SectionFilmDetailsView();
  #filmDetailsInnerPopupComponent = new FilmDetailsInnerPopupView();
  #filmsDetailsTopContainerComponent;
  #filmsDetailsBottomContainerComponent;

  constructor({ film, handleDataChange }) {
    this.#film = film;
    this.#handleDataChange = handleDataChange;

    this.#filmsDetailsTopContainerComponent = this.#createFilmsTopContainerView();
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
    return new FilmDetailsBottomContainerView({
      comments: comments,
      handleAddComment: this.#handleCommentsAdd,
      handleCommentsDelete: this.#handleCommentsDelete
    });
  }

  #handleButtonFilterClick = (filterType) => {
    this.#film.user_details[filterType] = !this.#film.user_details[filterType];
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      UpdateType.OPENED_POPUP,
      this.#film
    );
  };

  #handleCommentsAdd = (comment) => {
    const update = {
      film: this.#film,
      comment: comment
    };
    this.#handleDataChange(
      UserAction.ADD_COMMENT,
      UpdateType.GET_COMMENT,
      update
    );
  };

  #handleCommentsDelete = (comment) => {
    const update = {
      film: this.#film,
      comment: comment
    };

    this.#handleDataChange(
      UserAction.DELETE_COMMENT,
      UpdateType.GET_COMMENT,
      update
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
    render(this.#filmsDetailsTopContainerComponent, this.#filmDetailsInnerPopupComponent.element);

  }

  destroy() {
    window.popupScrollPosition = this.#sectionFilmDetailsComponent.element.scrollTop;
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscapeKeydown);
    remove(this.#sectionFilmDetailsComponent);
  }

  renderComments(comment) {
    if (this.#filmsDetailsBottomContainerComponent) {
      const update = this.#createFilmsBottomContainerView(comment);
      replace(update, this.#filmsDetailsBottomContainerComponent);
      this.#filmsDetailsBottomContainerComponent = update;
      this.#sectionFilmDetailsComponent.element.scrollTo(START_POSITION, window.popupScrollPosition);

      return;
    }

    this.#filmsDetailsBottomContainerComponent = this.#createFilmsBottomContainerView(comment);
    render(this.#filmsDetailsBottomContainerComponent, this.#filmDetailsInnerPopupComponent.element);
    this.#sectionFilmDetailsComponent.element.scrollTo(START_POSITION, window.popupScrollPosition);


  }

  init() {
    this.#renderPopup();
  }
}
