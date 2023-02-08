import ListCommentsView from '../view/popup/comments/list-comments-view';
import CommentsWrapView from '../view/popup/comments/comments-wrap-view';
import BottomContainerView from '../view/popup/containers/bottom-container-view';
import {remove, render} from '../framework/render';
import FormCommentView from '../view/popup/comments/form-comment-view';
import CommentItemView from '../view/popup/comments/comment-item-view';

export default class CommentsPresenter {
  #place = null;

  #film;
  #filmsComments;

  #handleCommentAdd;
  #handleCommentsDelete;

  #currentComment = null;

  #commentsComponents = new Map();

  #bottomContainerComponent = new BottomContainerView();
  #commentWrapperComponent = null;
  #commentFormComponent = null;
  #listCommentsComponent = new ListCommentsView();

  constructor({ film, comments, handleCommentAdd, onCommentsDelete }) {
    this.#film = film;
    this.#filmsComments = comments;
    this.#handleCommentAdd = handleCommentAdd;
    this.#handleCommentsDelete = (comment) => {
      this.#currentComment = comment.id;
      onCommentsDelete(comment);
    };
  }

  #renderComments(place) {
    this.#filmsComments.forEach((comment) => {
      const commentComponent = new CommentItemView({
        comment,
        onCommentDelete: () => this.#handleCommentsDelete(comment)
      });
      this.#commentsComponents.set(comment.id, commentComponent);
      render(commentComponent, place);
    });
  }

  #renderFormComment() {
    this.#commentFormComponent = new FormCommentView({
      onCommentAdd: this.#handleCommentAdd
    });
    render(this.#commentFormComponent, this.#commentWrapperComponent.element);
  }

  #renderBlockComments() {
    render(this.#bottomContainerComponent, this.#place);
    this.#commentWrapperComponent = new CommentsWrapView({ commentsLength: this.#filmsComments.length });
    render(this.#commentWrapperComponent, this.#bottomContainerComponent.element);
    render(this.#listCommentsComponent, this.#commentWrapperComponent.element);
    this.#renderComments(this.#listCommentsComponent.element);
    this.#renderFormComment();
  }

  destroy() {
    remove(this.#bottomContainerComponent);
    remove(this.#commentWrapperComponent);
    remove(this.#commentFormComponent);
    remove(this.#listCommentsComponent);
  }

  init(place) {
    this.#place = place;
    this.#renderBlockComments();
  }

  setDeleting() {
    this.#commentsComponents.get(this.#currentComment).updateElement({
      isDisabled: true,
      isDeleting: true,
    });
  }

  setDeleteAborting() {
    const resetFormState = () => {
      this.#commentsComponents.get(this.#currentComment).updateElement({
        isDisabled: false,
        isDeleting: false,
      });
    };

    this.#commentsComponents.get(this.#currentComment).shake(resetFormState);
  }

  setAdding() {
    this.#commentFormComponent.updateElement({
      isDisabled: true,
    });
  }

  setAddAborting() {
    const resetFormState = () => {
      this.#commentFormComponent.updateElement({
        isDisabled: false,
      });
    };

    this.#commentFormComponent.shake(resetFormState);
  }

}
