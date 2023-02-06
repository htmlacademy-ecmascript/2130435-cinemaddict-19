import {setHumanizeDateAgoComment} from '../../utils/utils';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';

function createCommentItem(comment) {
  return `
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${setHumanizeDateAgoComment(comment.date)}</span>
        <button class="film-details__comment-delete">${ comment.isDeleting ? 'Deleting...' : 'Delete' }</button>
      </p>
    </div>
  </li>`;
}

export default class CommentItemView extends AbstractStatefulView {
  #deleteCommentHandler = null;

  constructor({comment, onCommentDelete}) {
    super();

    this._setState({
      ...comment,
      isDeleting: false
    });

    this.#deleteCommentHandler = () => onCommentDelete();
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__comment-delete')
      .addEventListener('click', this.#deleteCommentHandler);
  }

  get template() {
    return createCommentItem(this._state);
  }
}
