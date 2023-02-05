import ListCommentsView from '../view/popup/list-comments-view';
import CommentsWrapView from '../view/popup/comments-wrap-view';
import BottomContainerView from '../view/popup/bottom-container-view';
import {render} from '../framework/render';
import FormCommentView from '../view/popup/form-comment-view';
import CommentItemView from '../view/popup/comment-item-view';
import {UpdateType, UserAction} from '../utils/const';

export default class CommentsPresenter {
  #place = null;

  #film;
  #filmsComments;
  #handleDataChange = null;

  #commentList = new Map();

  #bottomContainerComponent = new BottomContainerView();
  #commentWrapperComponent = null;
  #commentFormComponent = null;
  #listCommentsComponent = new ListCommentsView();

  constructor({ film, comments, onDataChange }) {
    this.#film = film;
    this.#filmsComments = comments;
    this.#handleDataChange = onDataChange;
    this.#setCommentsMap();
  }

  #setCommentsMap() {
    this.#filmsComments.forEach((comment) => this.#commentList.set(comment.id, comment));
  }

  #renderComments(place) {
    this.#commentList.forEach((comment) => {
      const commentComponent = new CommentItemView({comment, onCommentDelete: null})
      render(commentComponent, place);
    });
  }

  #renderFormComment() {
    this.#commentFormComponent = new FormCommentView({
      onCommentAdd: this.#handleCommentAdd
    })
    render(this.#commentFormComponent, this.#commentWrapperComponent.element)
  }

  #renderBlockComments() {
    render(this.#bottomContainerComponent, this.#place);
    this.#commentWrapperComponent = new CommentsWrapView({ commentsLength: this.#filmsComments.length });
    render(this.#commentWrapperComponent, this.#bottomContainerComponent.element);
    render(this.#listCommentsComponent, this.#commentWrapperComponent.element);
    this.#renderComments(this.#listCommentsComponent.element);
    this.#renderFormComment();
  }


  #handleCommentAdd = (comment) => {
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

  init(place) {
    this.#place = place;
    this.#renderBlockComments();
  }



}
