import { render } from '../render.js';
import NewFilmPopupCommentView from '../view/atom/film-popup-comment-view.js';
import NewFilmPopupDetailsInfoView from '../view/atom/film-popup-details-info-view.js';
import NewFilmPopupCommentsListView from '../view/molecule/film-popup-comments-list-view.js';
import NewFilmPopupControlsView from '../view/molecule/film-popup-controls-view.js';
import NewFilmPopupView from '../view/template/film-popup-view.js';
import NewFilmPopupBottomContainerView from '../view/wrapper/film-popup-bottom-container-view.js';
import NewFilmPopupTopContainerView from '../view/wrapper/film-popup-top-container-view.js';

export default class PopupPresenter {

  constructor(boardContainer, FilmModel, CommentsFilmModel) {
    this.boardContainer = boardContainer;
    this.PopupFilmModel = FilmModel.getFilmForPopup();
    this.commentsList = CommentsFilmModel.getComments();
  }

  getCommentsListComponents() {
    return this.findCommentsByFilm().map((comment) => new NewFilmPopupCommentView(comment));
  }

  findCommentsByFilm() {
    return this.commentsList.filter((comment) => this.PopupFilmModel.comments.some((item) => item === comment.id));
  }

  init() {
    const popupInfoComponent = new NewFilmPopupDetailsInfoView(this.PopupFilmModel);
    const popupControlsComponent = new NewFilmPopupControlsView(this.PopupFilmModel);
    const topPopupComponent = new NewFilmPopupTopContainerView(popupControlsComponent, popupInfoComponent);

    const commentsListComponents = new NewFilmPopupCommentsListView(...this.getCommentsListComponents());
    const botPopupComponent = new NewFilmPopupBottomContainerView(commentsListComponents);

    const popupComponent = new NewFilmPopupView(topPopupComponent, botPopupComponent);
    render(popupComponent, this.boardContainer);
  }
}
