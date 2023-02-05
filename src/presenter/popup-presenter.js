import { remove, render } from '../framework/render.js';
import { UpdateType, UserAction } from '../utils/const.js';
import FilmDetailsBottomContainerView from '../view/popup/containers/film-details-bottom-container-view.js';
import FilmDetailsInnerPopupView from '../view/popup/containers/film-details-inner-view.js';
import FilmsDetailsTopContainerView from '../view/popup/containers/film-details-top-container-view.js';
import SectionFilmDetailsView from '../view/popup/sections/section-film-details-view.js';

const START_POSITION = 0;

export default class PopupPresenter {
  #place = document.body;

  #film;
  #commentsModel;

  #handleDataChange;

  #currentComments;

  #sectionFilmDetailsComponent = new SectionFilmDetailsView();
  #filmDetailsInnerPopupComponent = new FilmDetailsInnerPopupView();
  #filmsDetailsTopContainerComponent;
  #filmsDetailsBottomContainerComponent;

  constructor({ film, commentsModel, handleDataChange }) {
    this.#film = film;
    this.#commentsModel = commentsModel;
    this.#handleDataChange = handleDataChange;

    this.#currentComments = this.#findCommentsFilm(this.#film);

    this.#filmsDetailsTopContainerComponent = this.#createFilmsTopContainerView();
    this.#filmsDetailsBottomContainerComponent = this.#createFilmsBottomContainerView();

    document.addEventListener('keydown', this.#onEscapeKeydown);
  }

  #createFilmsTopContainerView() {
    return new FilmsDetailsTopContainerView({
      currentFilmModel: this.#film,
      onButtonCloseClick: this.#handleButtonCloseClick,
      onFilmControlButtonFilterClick: this.#handleButtonFilterClick
    });
  }

  #createFilmsBottomContainerView() {
    return new FilmDetailsBottomContainerView({
      comments: this.#currentComments,
      handleAddComment: this.#handleCommentsAdd,
      handleCommentsDelete: this.#handleCommentsDelete
    });
  }

  #findCommentsFilm(film) {
    return this.#commentsModel.slice().
      filter((comment) => film.comments.some((filmId) => filmId === comment.id));
  }

  #handleButtonFilterClick = (filterType) => {
    this.#film.user_details[filterType] = !this.#film.user_details[filterType];
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      UpdateType.OPENED_POPUP,
      this.#film
    );
  };

  #handleCommentsDelete = (comment) => {
    const update = {
      film: this.#film,
      comment: comment
    };

    this.#handleDataChange(
      UserAction.DELETE_COMMENT,
      UpdateType.OPENED_POPUP,
      update
    );

  };

  #handleCommentsAdd = (comment) => {
    const update = {
      film: this.#film,
      comment: comment
    };
    this.#handleDataChange(
      UserAction.ADD_COMMENT,
      UpdateType.OPENED_POPUP,
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
    render(this.#filmsDetailsBottomContainerComponent, this.#filmDetailsInnerPopupComponent.element);
  }

  destroy() {
    window.popupScrollPosition = this.#sectionFilmDetailsComponent.element.scrollTop;
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscapeKeydown);
    remove(this.#sectionFilmDetailsComponent);
  }

  init() {
    this.#renderPopup();
    this.#sectionFilmDetailsComponent.element.scrollTo(START_POSITION, window.popupScrollPosition);
  }
}
