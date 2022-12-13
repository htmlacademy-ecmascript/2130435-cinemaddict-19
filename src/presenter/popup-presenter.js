import { render } from '../render.js';
import NewFilmPopupCommentView from '../view/atom/film-popup-comment-view.js';
import NewFilmPopupDetailsInfoView from '../view/atom/film-popup-details-info-view.js';
import NewFilmPopupCommentsListView from '../view/molecule/film-popup-comments-list-view.js';
import NewFilmPopupControlsView from '../view/molecule/film-popup-controls-view.js';
import NewFilmPopupView from '../view/template/film-popup-view.js';
import NewFilmPopupBottomContainerView from '../view/wrapper/film-popup-bottom-container-view.js';
import NewFilmPopupTopContainerView from '../view/wrapper/film-popup-top-container-view.js';

export default class PopupPresenter {
  #place;
  #filmModel;
  #commentsList;
  #film;
  #popup;


  constructor(place, FilmModel, CommentsFilmModel) {
    this.#place = place;
    this.#filmModel = FilmModel;
    this.#commentsList = CommentsFilmModel.comments;
  }

  get filmModel() {
    return this.#filmModel;
  }

  get film() {
    return this.#film;
  }

  set film(newFilm) {
    this.#film = newFilm;
  }

  #getCommentsListComponents() {
    return this.#findCommentsByFilm().map((comment) => new NewFilmPopupCommentView(comment));
  }

  #findCommentsByFilm() {
    return this.#commentsList.filter((comment) => this.film.comments.some((item) => item === comment.id));
  }

  init() {
    const popupInfoComponent = new NewFilmPopupDetailsInfoView(this.film);
    const popupControlsComponent = new NewFilmPopupControlsView(this.film);
    const topPopupComponent = new NewFilmPopupTopContainerView(popupControlsComponent, popupInfoComponent);

    const commentsListComponents = new NewFilmPopupCommentsListView(...this.#getCommentsListComponents());
    const botPopupComponent = new NewFilmPopupBottomContainerView(commentsListComponents);

    this.#popup = new NewFilmPopupView(topPopupComponent, botPopupComponent);
    render(this.#popup, this.#place);
    this.closePopupControl();
  }

  removePopup() {
    const popup = document.querySelector('.film-details');
    if (!popup) {
      return;
    }
    popup.remove();
    document.body.classList.remove('hide-overflow');
  }

  onCloseButtonClick() {
    const popup = document.querySelector('.film-details');
    const closeButton = popup.querySelector('.film-details__close-btn');
    closeButton.addEventListener('click', this.removePopup);
  }

  closePopupControl() {
    const onEscapeKeydown = (evt) => {
      if (evt.key === 'Escape') {
        this.removePopup();
        document.removeEventListener('keydown', onEscapeKeydown);
      }
    };
    document.addEventListener('keydown', onEscapeKeydown);
    this.onCloseButtonClick();
  }

  renderPopup () {
    const sectionFilm = document.querySelector('.films');
    sectionFilm.addEventListener('click', (evt) => {
      if (evt.target.closest('.film-card')) {
        this.removePopup();
        document.body.classList.add('hide-overflow');
        const currentId = Number(evt.target.closest('.film-card').dataset.filmId);
        this.film = this.filmModel.films.find((item) => item.id === currentId);
        this.init();
      }
    });
  }
}

