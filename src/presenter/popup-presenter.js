import { render } from '../render.js';
import { isEscape } from '../utils.js';
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
  #filmByPopup;
  #popupComponent;


  constructor(place, FilmModel, CommentsFilmModel) {
    this.#place = place;
    this.#filmModel = FilmModel;
    this.#commentsList = CommentsFilmModel.comments;
  }

  #findCommentsByFilm() {
    return this.#commentsList.filter((comment) => this.#filmByPopup.comments.some((item) => item === comment.id));
  }

  #getCommentsListComponents() {
    return this.#findCommentsByFilm().map((comment) => new NewFilmPopupCommentView(comment));
  }

  #createPopup() {
    const popupInfoComponent = new NewFilmPopupDetailsInfoView(this.#filmByPopup);
    const popupControlsComponent = new NewFilmPopupControlsView(this.#filmByPopup);
    const topPopupComponent = new NewFilmPopupTopContainerView(popupControlsComponent, popupInfoComponent);

    const commentsListComponents = new NewFilmPopupCommentsListView(...this.#getCommentsListComponents());
    const botPopupComponent = new NewFilmPopupBottomContainerView(commentsListComponents);

    this.#popupComponent = new NewFilmPopupView(topPopupComponent, botPopupComponent);
  }

  #removePopup() {
    const popup = document.querySelector('.film-details');
    if (!popup) {
      return;
    }
    popup.remove();
    this.#popupComponent.removeElement();
    document.body.classList.remove('hide-overflow');
  }

  #closePopupControl() {
    const popup = document.querySelector('.film-details');
    const closeButton = popup.querySelector('.film-details__close-btn');

    const onCloseButtonClick = () => {
      this.#removePopup();
    };
    const onEscapeKeydown = (evt) => {
      if (isEscape(evt)) {
        this.#removePopup();
        document.removeEventListener('keydown', onEscapeKeydown);
      }
    };

    closeButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onEscapeKeydown);
  }


  #init() {
    this.#createPopup();
    render(this.#popupComponent, this.#place);
    this.#closePopupControl();
  }

  initRenderPopup () {
    const sectionFilm = document.querySelector('.films');
    const onFilmCardClick = (evt) => {
      const filmCard = evt.target.closest('.film-card');
      if (filmCard) {
        this.#removePopup();
        const currentId = Number(filmCard.dataset.filmId);
        document.body.classList.add('hide-overflow');
        this.#filmByPopup = this.#filmModel.films.find((item) => item.id === currentId);
        this.#init();
      }
    };

    sectionFilm.addEventListener('click', onFilmCardClick);
  }

}

