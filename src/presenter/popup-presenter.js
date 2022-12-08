import { COMMENT, POPUP_FILM } from '../mock.js';
import { render } from '../render.js';
import NewFilmPopupComment from '../view/atom/film-popup-comment.js';
import NewPopupFilmDetailsInfoView from '../view/atom/film-popup-info.js';
import NewFilmPopupCommentsList from '../view/molecule/film-popup-comments-list.js';
import NewPopupFilmControlsView from '../view/molecule/film-popup-controls.js';
import NewFilmPopupView from '../view/template/film-popup.js';
import NewFilmPopupBottomContainer from '../view/wrapper/film-popup-bottom-container.js';
import NewFilmPopupTopContainer from '../view/wrapper/film-popup-top-container.js';

export default class PopupPresenter {
  popupInfoComponent = new NewPopupFilmDetailsInfoView(POPUP_FILM);
  popupControlsComponent = new NewPopupFilmControlsView();
  topPopupComponent = new NewFilmPopupTopContainer(this.popupControlsComponent, this.popupInfoComponent);

  oneCommentComponent = new NewFilmPopupComment(COMMENT);
  twoCommentComponent = new NewFilmPopupComment(COMMENT);
  commentListComponent = new NewFilmPopupCommentsList(this.oneCommentComponent, this.twoCommentComponent);
  botPopupComponent = new NewFilmPopupBottomContainer(this.commentListComponent);
  popupComponent = new NewFilmPopupView(this.topPopupComponent, this.botPopupComponent);


  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.popupComponent, this.boardContainer);
  }
}
