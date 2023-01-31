import { remove, render } from '../framework/render.js';
import { UpdateType, UserAction } from '../utils/const.js';
import FilmDetailsBottomContainerView from '../view/popup/containers/film-details-bottom-container-view.js';
import FilmDetailsInnerPopupView from '../view/popup/containers/film-details-inner-view.js';
import FilmsDetailsTopContainerView from '../view/popup/containers/film-details-top-container-view.js';
import SectionFilmDetailsView from '../view/popup/sections/section-film-details-view.js';

export default class PopupPresenter {
  #place = document.body;

  #film;
  #commentsModel;

  #handleDataChange;
  #handleButtonFilterClick;

  #currentComments;

  #sectionFilmDetailsComponent = new SectionFilmDetailsView();
  #filmDetailsInnerPopupComponent = new FilmDetailsInnerPopupView();
  #filmsDetailsTopContainerComponent;
  #filmsDetailsBottomContainerComponent;

  constructor({ film, commentsModel, handleDataChange, onButtonFilterClick }) {
    this.#film = film;
    this.#commentsModel = commentsModel;
    this.#handleDataChange = handleDataChange;
    this.#handleButtonFilterClick = onButtonFilterClick;

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

  #handleCommentsDelete = (comment) => {
    const index = this.#film.comments.findIndex((id) => id === comment.id);
    const update = {
      film:  {...this.#film,
        comments: [
          ...this.#film.comments.slice(0, index),
          ...this.#film.comments.slice(index + 1),
        ]
      },
      comment: comment
    };

    this.#handleDataChange(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      update
    );

  };

  #handleCommentsAdd = (comment) => {
    const update = {
      film:  {
        ...this.#film,
        comments : [
          ...this.#film.comments,
          comment.id
        ]
      },
      comment: comment
    };
    this.#handleDataChange(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      update
    );
  };

  #handleButtonCloseClick = () => {
    this.removePopup();
    window.popupScrollPosition = 0;
  };

  #onEscapeKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.removePopup();
      window.popupScrollPosition = 0;
    }
  };

  #renderPopup() {
    render(this.#sectionFilmDetailsComponent, this.#place);
    render(this.#filmDetailsInnerPopupComponent, this.#sectionFilmDetailsComponent.element);
    render(this.#filmsDetailsTopContainerComponent, this.#filmDetailsInnerPopupComponent.element);
    render(this.#filmsDetailsBottomContainerComponent, this.#filmDetailsInnerPopupComponent.element);
  }

  removePopup() {
    window.popupScrollPosition = this.#sectionFilmDetailsComponent.element.scrollTop;
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscapeKeydown);
    remove(this.#sectionFilmDetailsComponent);
  }

  init() {
    this.#renderPopup();
    this.#sectionFilmDetailsComponent.element.scrollTo(0, window.popupScrollPosition);
  }
}
