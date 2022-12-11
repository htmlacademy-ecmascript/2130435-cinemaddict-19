import { render } from '../render.js';
import NewFilmPopupComment from '../view/atom/film-popup-comment.js';
import NewPopupFilmDetailsInfoView from '../view/atom/film-popup-info.js';
import NewFilmPopupCommentsList from '../view/molecule/film-popup-comments-list.js';
import NewPopupFilmControlsView from '../view/molecule/film-popup-controls.js';
import NewFilmPopupView from '../view/template/film-popup.js';
import NewFilmPopupBottomContainer from '../view/wrapper/film-popup-bottom-container.js';
import NewFilmPopupTopContainer from '../view/wrapper/film-popup-top-container.js';

export default class PopupPresenter {

  constructor({boardContainer}, PopupFilmModel, CommentsFilmModel) {
    this.boardContainer = boardContainer;
    this.PopupFilmModel = PopupFilmModel;
    this.commentsList = CommentsFilmModel;
  }

  getCommentsListComponents() {
    return this.commentsList.map((comment) => new NewFilmPopupComment(comment));
  }

  init() {
    const popupInfoComponent = new NewPopupFilmDetailsInfoView(this.PopupFilmModel);
    const popupControlsComponent = new NewPopupFilmControlsView(this.PopupFilmModel);
    const topPopupComponent = new NewFilmPopupTopContainer(popupControlsComponent, popupInfoComponent);

    const commentsListComponents = new NewFilmPopupCommentsList(...this.getCommentsListComponents());
    const botPopupComponent = new NewFilmPopupBottomContainer(commentsListComponents);

    const popupComponent = new NewFilmPopupView(topPopupComponent, botPopupComponent);
    render(popupComponent, this.boardContainer);
  }
}
